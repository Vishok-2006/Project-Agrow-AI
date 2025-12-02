import React, { useState } from 'react';

function AnalysisContent() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                setResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        if (!selectedImage) return;
        setAnalyzing(true);

        // Simulate Analysis
        setTimeout(() => {
            const diseases = [
                { name: 'Early Blight', confidence: 92, treatment: 'Apply copper-based fungicide and remove infected leaves.' },
                { name: 'Leaf Spot', confidence: 88, treatment: 'Ensure proper air circulation and avoid overhead watering.' },
                { name: 'Healthy', confidence: 96, treatment: 'No action needed. Keep monitoring.' },
                { name: 'Powdery Mildew', confidence: 85, treatment: 'Use neem oil or sulfur-based fungicides.' }
            ];
            const randomResult = diseases[Math.floor(Math.random() * diseases.length)];
            setResult(randomResult);
            setAnalyzing(false);
        }, 2500);
    };

    return (
        <div className="glass-panel rounded-2xl p-8">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-microscope text-orange-400 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Crop Disease Analysis</h3>
                <p className="text-gray-400">Upload a photo of your crop to detect diseases.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div
                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer relative overflow-hidden ${selectedImage ? 'border-green-500/50 bg-gray-800/50' : 'border-gray-700 hover:border-green-500/50 bg-gray-800/30'}`}
                        onClick={() => document.getElementById('imageInput').click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {selectedImage ? (
                            <img src={selectedImage} alt="Analyzed crop" className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg" />
                        ) : (
                            <div className="py-8">
                                <i className="fas fa-cloud-upload-alt text-4xl text-gray-500 mb-4"></i>
                                <p className="text-gray-300 font-medium mb-2">Drag & Drop or Click to Upload</p>
                                <p className="text-sm text-gray-500">Supports JPG, PNG (Max 5MB)</p>
                            </div>
                        )}
                        <input
                            type="file"
                            id="imageInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    {selectedImage && (
                        <button
                            onClick={(e) => { e.stopPropagation(); analyzeImage(); }}
                            disabled={analyzing}
                            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-orange-900/20 flex items-center justify-center"
                        >
                            {analyzing ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-search mr-2"></i>}
                            {analyzing ? 'Scanning Crop...' : 'Analyze Disease'}
                        </button>
                    )}
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    {result ? (
                        <div className="animate-fade-in h-full flex flex-col justify-center">
                            <div className="flex items-center mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${result.name === 'Healthy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    <i className={`fas ${result.name === 'Healthy' ? 'fa-check' : 'fa-exclamation-triangle'}`}></i>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-400">Diagnosis</div>
                                    <div className="text-2xl font-bold text-white">{result.name}</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-400">Confidence</span>
                                    <span className="text-white">{result.confidence}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                                <h4 className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">Recommended Action</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{result.treatment}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                            <i className="fas fa-clipboard-check text-5xl mb-4 opacity-20"></i>
                            <p>Upload an image and click "Analyze" to see results here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AnalysisContent;
