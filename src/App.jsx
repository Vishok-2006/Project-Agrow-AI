import React, { useState, useEffect } from 'react';
import AuthContainer from './components/AuthContainer';
import MainContent from './components/MainContent';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <AuthContainer onLogin={handleLogin} />
            ) : (
                <MainContent user={user} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;
