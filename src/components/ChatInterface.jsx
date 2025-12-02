import React, { useState, useEffect, useRef } from 'react';
import AssistantContent from './tools/AssistantContent';
import WeatherContent from './tools/WeatherContent';
import PredictionContent from './tools/PredictionContent';
import AnalysisContent from './tools/AnalysisContent';
import LibraryContent from './tools/LibraryContent';

const BACKEND_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '';

function ChatInterface({ activeTool, toolData, setBackendStatus }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const currentTool = toolData[activeTool];

    const sendMessage = async (message) => {
        if (!message.trim()) return;

        // Add user message
        const userMessage = { role: 'user', content: message, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Add to history
        const newHistory = [...chatHistory, { role: 'user', content: message }];
        setChatHistory(newHistory);

        // Add typing indicator
        const typingMessage = { role: 'bot', content: '...', sender: 'bot', isTyping: true };
        setMessages((prev) => [...prev, typingMessage]);

        // Get auth token
        const token = localStorage.getItem('token');

        try {
            const resp = await fetch(`${BACKEND_BASE}/api/openai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: newHistory
                })
            });

            // Remove typing indicator
            setMessages((prev) => prev.filter((msg) => !msg.isTyping));

            if (!resp.ok) throw new Error(`OpenAI proxy failed: ${resp.status}`);

            const data = await resp.json();
            const text = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || JSON.stringify(data);

            // Add bot response
            const botMessage = { role: 'assistant', content: text, sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
            setChatHistory([...newHistory, { role: 'assistant', content: text }]);
            setBackendStatus('connected');
        } catch (err) {
            // Remove typing indicator
            setMessages((prev) => prev.filter((msg) => !msg.isTyping));

            console.warn('OpenAI proxy error:', err);

            let errorMessage = 'I am having trouble connecting to the server right now.';
            if (err.message.includes('500')) {
                errorMessage = 'Server configuration error (check API key). Falling back to local knowledge.';
            }

            // Use fallback response
            const fallback = generateFallbackResponse(message);
            const botMessage = { role: 'bot', content: fallback, sender: 'bot', isOffline: true };
            setMessages((prev) => [...prev, botMessage]);
            setBackendStatus('demo');
        }
    };

    const generateFallbackResponse = (message) => {
        const responses = {
            'tomato': 'Based on common tomato issues, this could be blight, nutrient deficiency, or pest damage. Check for dark spots (blight), yellowing leaves (nitrogen deficiency), or small holes (pest damage). Ensure proper watering and consider organic fungicides.',
            'corn': 'For corn, I recommend a balanced fertilizer with higher nitrogen content during early growth (like 16-16-8), then switch to lower nitrogen, higher phosphorus during tasseling. Apply 1-2 pounds per 100 square feet.',
            'wheat': 'Wheat is typically ready for harvest when the grain moisture content is 12-14%. Look for golden color, hard kernels when pressed with fingernail, and dry stems. This usually occurs 30-35 days after flowering.',
            'fertilizer': 'Choose fertilizers based on soil testing results. Generally, use higher nitrogen for leafy growth, phosphorus for root development, and potassium for overall plant health. Organic options include compost, manure, and bone meal.',
            'pest': 'Integrated Pest Management (IPM) is most effective. Use beneficial insects, crop rotation, companion planting, and targeted organic pesticides only when necessary. Regular monitoring helps catch problems early.'
        };

        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response + ' (Offline Mode)';
            }
        }

        const defaultResponses = [
            "That's an interesting question! For specific crop issues, I'd recommend consulting with your local agricultural extension office. In the meantime, ensure proper watering, soil nutrition, and pest monitoring.",
            "Based on general farming practices, regular soil testing, proper crop rotation, and integrated pest management are key to healthy crops. Could you provide more specific details about your situation?",
            "Great question! Successful farming depends on many factors including soil health, weather conditions, and proper timing. Consider factors like your local climate zone and soil type for the best results."
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)] + ' (Offline Mode)';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(inputValue);
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-gray-800">
            {/* Header */}
            <div className="h-16 border-b border-gray-800/50 flex items-center justify-between px-6 bg-gray-900/50 backdrop-blur-md">
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg bg-${currentTool.color}-500/20 text-${currentTool.color}-400 flex items-center justify-center mr-3`}>
                        <i className={`fas ${currentTool.icon}`}></i>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">{currentTool.title}</h2>
                        <p className="text-xs text-gray-400">{currentTool.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-600">
                        <i className="fas fa-bell"></i>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors border border-gray-700 hover:border-gray-600">
                        <i className="fas fa-question"></i>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-gray-900">
                <div className="max-w-5xl mx-auto">
                    {activeTool === 'assistant' && <AssistantContent messages={messages} sendMessage={sendMessage} messagesEndRef={messagesEndRef} />}
                    {activeTool === 'weather' && <WeatherContent />}
                    {activeTool === 'prediction' && <PredictionContent />}
                    {activeTool === 'analysis' && <AnalysisContent />}
                    {activeTool === 'library' && <LibraryContent />}
                </div>
            </div>

            {/* Chat Input Area */}
            {activeTool === 'assistant' && (
                <div className="p-6 bg-gray-900/80 backdrop-blur-md border-t border-gray-800/50">
                    <div className="max-w-4xl mx-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-50"></div>
                        <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center p-2 shadow-2xl">
                            <button className="p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-xl transition-all">
                                <i className="fas fa-paperclip"></i>
                            </button>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask Agrow AI anything..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder-gray-500 outline-none"
                            />
                            <button
                                onClick={() => sendMessage(inputValue)}
                                className="p-3 bg-green-600 hover:bg-green-500 text-white rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:scale-105"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-xs text-gray-500">AI can make mistakes. Verify important agricultural decisions.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatInterface;
