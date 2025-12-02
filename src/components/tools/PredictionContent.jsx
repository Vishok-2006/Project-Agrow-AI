import React, { useState } from 'react';

function PredictionContent() {
    const [formData, setFormData] = useState({
        crop: 'Wheat',
        area: '',
        soilType: 'Loamy',
        irrigation: 'Rainfed'
    });
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePredict = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate AI Prediction
        setTimeout(() => {
            const baseYield = {
                'Wheat': 3.5,
                'Rice': 4.2,
                'Corn': 5.8,
                'Soybean': 2.9
            }[formData.crop] || 3.0;

            const areaNum = parseFloat(formData.area) || 1;
            const predictedYield = (baseYield * areaNum * (Math.random() * 0.4 + 0.8)).toFixed(2);

            setPrediction({
                yield: predictedYield,
                unit: 'Tonnes',
                confidence: (Math.random() * 10 + 85).toFixed(1),
                harvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()
            });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="glass-panel rounded-2xl p-8">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-line text-purple-400 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Crop Yield Prediction</h3>
                <p className="text-gray-400">AI-powered forecasting for your farm.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <form onSubmit={handlePredict} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Crop Type</label>
                        <select
                            name="crop"
                            value={formData.crop}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option>Wheat</option>
                            <option>Rice</option>
                            <option>Corn</option>
                            <option>Soybean</option>
                            <option>Tomato</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Field Area (Acres)</label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 5"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Soil Type</label>
                        <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        >
                            <option>Loamy</option>
                            <option>Clay</option>
                            <option>Sandy</option>
                            <option>Silt</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center"
                    >
                        {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-magic mr-2"></i>}
                        {loading ? 'Analyzing...' : 'Predict Yield'}
                    </button>
                </form>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 flex flex-col justify-center">
                    {prediction ? (
                        <div className="text-center animate-fade-in">
                            <div className="text-sm text-gray-400 mb-2">Estimated Yield</div>
                            <div className="text-5xl font-bold text-white mb-2">{prediction.yield} <span className="text-2xl text-purple-400">{prediction.unit}</span></div>
                            <div className="flex justify-center space-x-4 mt-4 text-sm">
                                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                                    <i className="fas fa-check-circle mr-1"></i> {prediction.confidence}% Confidence
                                </div>
                                <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
                                    <i className="far fa-calendar-alt mr-1"></i> Harvest: {prediction.harvestDate}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            <i className="fas fa-chart-bar text-5xl mb-4 opacity-20"></i>
                            <p>Enter your farm details to get an AI yield prediction.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PredictionContent;
