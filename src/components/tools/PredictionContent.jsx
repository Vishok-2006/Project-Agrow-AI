import React from 'react';

function PredictionContent() {
    return (
        <div className="glass-panel rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-purple-400 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Crop Prediction AI</h3>
            <p className="text-gray-400">Advanced yield forecasting coming soon.</p>
        </div>
    );
}

export default PredictionContent;
