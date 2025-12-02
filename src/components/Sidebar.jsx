import React, { useState, useEffect } from 'react';

const BACKEND_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '';

function Sidebar({ user, activeTool, setActiveTool, onLogout, backendStatus }) {
    const [showSettings, setShowSettings] = useState(false);
    const [status, setStatus] = useState('demo');

    useEffect(() => {
        checkBackendHealth();
        const interval = setInterval(checkBackendHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    const checkBackendHealth = async () => {
        try {
            const res = await fetch(`${BACKEND_BASE}/health`);
            if (res.ok) {
                setStatus('connected');
            }
        } catch (e) {
            setStatus('demo');
            console.log('Backend offline, running in demo mode');
        }
    };

    const tools = [
        { id: 'assistant', icon: 'fa-robot', label: 'AI Assistant', color: 'green' },
        { id: 'weather', icon: 'fa-cloud-sun', label: 'Weather AI', color: 'blue' },
        { id: 'prediction', icon: 'fa-chart-line', label: 'Crop Prediction', color: 'purple' },
        { id: 'analysis', icon: 'fa-microscope', label: 'Crop Analysis', color: 'orange' },
        { id: 'library', icon: 'fa-book', label: 'Knowledge Base', color: 'yellow' }
    ];

    return (
        <div className="w-72 glass border-r border-gray-800 flex flex-col relative z-20">
            {/* Header */}
            <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-900/20 mr-3">
                        <i className="fas fa-leaf text-white text-lg"></i>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Agrow AI</h1>
                        <div className="text-xs text-green-400 font-medium tracking-wide">PRO EDITION</div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        // Reset chat or create new conversation
                        window.location.reload();
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-3 px-4 rounded-xl transition-all shadow-lg shadow-green-900/30 flex items-center justify-center group border border-green-500/20"
                >
                    <i className="fas fa-plus mr-2 group-hover:rotate-90 transition-transform"></i>
                    <span className="font-medium">New Chat</span>
                </button>
            </div>

            {/* AI Tools Menu */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Core Tools</h3>
                    <div className="space-y-1">
                        {tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`w-full text-left p-3 rounded-xl hover:bg-white/5 transition-all flex items-center group border border-transparent hover:border-white/5 ${activeTool === tool.id ? 'bg-white/5 border-white/10' : ''
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg bg-${tool.color}-500/10 text-${tool.color}-400 flex items-center justify-center mr-3 group-hover:bg-${tool.color}-500/20 transition-colors`}>
                                    <i className={`fas ${tool.icon}`}></i>
                                </div>
                                <span className="font-medium text-gray-300 group-hover:text-white">{tool.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings & Status */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">System</h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-all flex items-center group border border-transparent hover:border-white/5"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gray-700/50 text-gray-400 flex items-center justify-center mr-3 group-hover:bg-gray-700 transition-colors">
                                <i className="fas fa-cog"></i>
                            </div>
                            <span className="font-medium text-gray-300 group-hover:text-white">Settings</span>
                        </button>

                        {/* Backend Status Indicator */}
                        <div className="px-3 py-2 mt-2">
                            <div className={`flex items-center text-xs px-3 py-2 rounded-lg border ${status === 'connected'
                                    ? 'text-green-400 bg-green-400/10 border-green-400/20'
                                    : 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
                                }`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${status === 'connected' ? 'bg-green-400' : 'bg-yellow-500 animate-pulse'}`}></div>
                                <span>{status === 'connected' ? 'Backend Connected' : 'Demo Mode (Offline)'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-800/50 bg-black/20">
                <div className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center border-2 border-gray-700 group-hover:border-gray-500 transition-colors">
                            <span className="text-sm font-bold text-white">
                                {user?.firstName?.[0]}{user?.lastName?.[0]}
                            </span>
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                                {user?.firstName} {user?.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                                {user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Free'} Plan
                            </div>
                        </div>
                    </div>
                    <button onClick={onLogout} className="text-gray-500 hover:text-red-400 transition-colors p-2">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
                    <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 relative z-10 border border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Settings</h3>
                            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white transition-colors">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-medium">Dark Mode</div>
                                    <div className="text-sm text-gray-400">Use dark theme for interface</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            <div className="pt-4 border-t border-gray-700">
                                <div className="text-sm text-gray-400 mb-2">Account Type</div>
                                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                                    <div className="flex items-center">
                                        <i className="fas fa-crown text-yellow-500 mr-2"></i>
                                        <span className="text-white font-medium">Premium Plan</span>
                                    </div>
                                    <button className="text-xs text-green-400 hover:text-green-300 font-medium">Manage</button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-900/50 border-t border-gray-700 flex justify-end">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
