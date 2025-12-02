import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';

function MainContent({ user, onLogout }) {
    const [activeTool, setActiveTool] = useState('assistant');
    const [backendStatus, setBackendStatus] = useState('demo');

    const toolData = {
        assistant: {
            title: 'AI Assistant',
            description: 'Get personalized farming advice and crop recommendations',
            icon: 'fa-robot',
            color: 'green'
        },
        weather: {
            title: 'Weather AI',
            description: 'Hyperlocal weather forecasts and agricultural insights',
            icon: 'fa-cloud-sun',
            color: 'blue'
        },
        prediction: {
            title: 'Crop Prediction AI',
            description: 'Predict yields, optimal harvest times, and market trends',
            icon: 'fa-chart-line',
            color: 'purple'
        },
        analysis: {
            title: 'Crop Analysis',
            description: 'AI-powered crop health analysis from images',
            icon: 'fa-microscope',
            color: 'orange'
        },
        library: {
            title: 'Knowledge Library',
            description: 'Browse farming guides, best practices, and research',
            icon: 'fa-book',
            color: 'yellow'
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                user={user}
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                onLogout={onLogout}
                backendStatus={backendStatus}
            />
            <ChatInterface
                activeTool={activeTool}
                toolData={toolData}
                setBackendStatus={setBackendStatus}
            />
        </div>
    );
}

export default MainContent;
