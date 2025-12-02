import React from 'react';

function AssistantContent({ messages, sendMessage, messagesEndRef }) {
    const suggestions = [
        { icon: 'fa-leaf', color: 'green', title: 'Plant Disease', text: 'How do I treat tomato blight?' },
        { icon: 'fa-flask', color: 'blue', title: 'Fertilizers', text: 'What is the best fertilizer for corn?' },
        { icon: 'fa-chart-line', color: 'purple', title: 'Market Trends', text: 'Analyze the current market trends for wheat' }
    ];

    return (
        <div className="h-full flex flex-col">
            {messages.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-900/40 animate-float">
                        <i className="fas fa-robot text-4xl text-white"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">How can I help your farm today?</h2>
                    <p className="text-gray-400 max-w-md mx-auto mb-8">
                        Ask about crop diseases, weather impacts, market prices, or general farming advice.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => sendMessage(suggestion.text)}
                                className={`p-4 glass rounded-xl hover:bg-white/5 transition-all group border border-gray-700 hover:border-${suggestion.color}-500/30`}
                            >
                                <i className={`fas ${suggestion.icon} text-${suggestion.color}-400 mb-3 text-xl group-hover:scale-110 transition-transform`}></i>
                                <h3 className="font-semibold text-white mb-1">{suggestion.title}</h3>
                                <p className="text-xs text-gray-400">"{suggestion.text}"</p>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex-1 space-y-6 pb-4 min-h-[400px]">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-bubble flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                        >
                            {msg.sender === 'bot' && (
                                <>
                                    <div className={`w-8 h-8 ${msg.isOffline ? 'bg-yellow-600' : msg.isTyping ? 'bg-gray-600' : 'bg-green-600'} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
                                        <i className={`fas ${msg.isOffline ? 'fa-exclamation-triangle' : 'fa-robot'} text-white text-sm`}></i>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg shadow-sm max-w-2xl border border-gray-700">
                                        {msg.isTyping ? (
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-gray-200">{msg.content}</p>
                                                {msg.isOffline && (
                                                    <p className="text-xs text-yellow-500 mt-2 italic">
                                                        Running in limited offline mode. Restart server to connect to AI.
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            {msg.sender === 'user' && (
                                <>
                                    <div className="bg-green-700 text-white p-4 rounded-lg shadow-sm max-w-2xl">
                                        <p>{msg.content}</p>
                                    </div>
                                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                                        <i className="fas fa-user text-white text-sm"></i>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
}

export default AssistantContent;
