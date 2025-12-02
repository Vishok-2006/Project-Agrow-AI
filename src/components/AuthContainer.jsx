import React, { useState } from 'react';
import { getBackendUrl, getApiEndpoint, config } from '../config/env';

function AuthContainer({ onLogin }) {
    const [isSignup, setIsSignup] = useState(false);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        loginEmail: '',
        loginPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 5000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { loginEmail, loginPassword } = formData;

        if (loginEmail && loginPassword) {
            try {
                const response = await fetch(getApiEndpoint(config.backend.endpoints.authLogin), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: loginEmail, password: loginPassword })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    onLogin(data.user);
                } else {
                    showMessage(data.error || 'Login failed', 'error');
                }
            } catch (error) {
                console.warn('Backend not available, using demo mode:', error);
                const demoUser = {
                    id: 1,
                    firstName: loginEmail.split('@')[0],
                    lastName: 'User',
                    email: loginEmail,
                    plan: 'demo'
                };
                localStorage.setItem('token', 'demo-token-' + Date.now());
                localStorage.setItem('user', JSON.stringify(demoUser));
                showMessage('Logged in (Demo Mode - Backend not running)', 'success');
                setTimeout(() => onLogin(demoUser), 1000);
            }
        } else {
            showMessage('Please fill in all fields.', 'error');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = formData;

        if (firstName && lastName && email && password) {
            try {
                const response = await fetch(getApiEndpoint(config.backend.endpoints.authRegister), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName, lastName, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    onLogin(data.user);
                } else {
                    showMessage(data.error || 'Registration failed', 'error');
                }
            } catch (error) {
                console.warn('Backend not available, using demo mode:', error);
                const demoUser = {
                    id: 1,
                    firstName,
                    lastName,
                    email,
                    plan: 'demo'
                };
                localStorage.setItem('token', 'demo-token-' + Date.now());
                localStorage.setItem('user', JSON.stringify(demoUser));
                showMessage('Registered (Demo Mode - Backend not running)', 'success');
                setTimeout(() => onLogin(demoUser), 1000);
            }
        } else {
            showMessage('Please fill in all required fields.', 'error');
        }
    };

    return (
        <div className="auth-container fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden my-auto">
                {/* Header */}
                <div className="text-center py-8 bg-gradient-to-r from-green-700 to-green-600 text-white">
                    <div className="flex items-center justify-center mb-4">
                        <i className="fas fa-seedling text-3xl mr-3"></i>
                        <h1 className="text-2xl font-bold">Agrow AI</h1>
                    </div>
                    <p className="text-green-100">The Intelligent Companion in Agriculture</p>
                </div>

                {/* Form Container */}
                <div className="relative overflow-hidden">
                    {/* Login Form */}
                    {!isSignup && (
                        <div className="visible-form p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="loginEmail"
                                        required
                                        value={formData.loginEmail}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-800"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        required
                                        value={formData.loginPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-800"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors mb-4"
                                >
                                    Sign In
                                </button>
                            </form>
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsSignup(true)}
                                        className="text-green-700 hover:text-green-800 font-semibold"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                            {message && (
                                <div className={`mt-4 px-4 py-3 rounded ${message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
                                    <strong>{message.type === 'error' ? 'Error!' : 'Success!'}</strong> {message.text}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Signup Form */}
                    {isSignup && (
                        <div className="visible-form p-8 pb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Join Agrow AI</h2>
                            <form onSubmit={handleSignup}>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-800"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-800"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-800"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent text-gray-800"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors mb-6"
                                >
                                    Create Account
                                </button>
                            </form>
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setIsSignup(false)}
                                        className="text-green-700 hover:text-green-800 font-semibold"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                            {message && (
                                <div className={`mt-4 px-4 py-3 rounded ${message.type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'}`}>
                                    <strong>{message.type === 'error' ? 'Error!' : 'Success!'}</strong> {message.text}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthContainer;
