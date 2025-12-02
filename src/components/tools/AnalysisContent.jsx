import React, { useState } from 'react';

function AnalysisContent() {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
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
            };
            reader.readAsDataURL(file);
        }
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

            <div
                className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-green-500/50 transition-colors cursor-pointer bg-gray-800/30"
                onClick={() => document.getElementById('imageInput').click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                {selectedImage ? (
                    <div>
                        <img src={selectedImage} alt="Analyzed crop" className="max-w-full max-h-64 mx-auto rounded-lg mb-4" />
                        <p className="text-gray-300 font-medium">Image uploaded! Analysis coming soon...</p>
                    </div>
                ) : (
                    <>
                        <i className="fas fa-cloud-upload-alt text-4xl text-gray-500 mb-4"></i>
                        <p className="text-gray-300 font-medium mb-2">Drag & Drop or Click to Upload</p>
                        <p className="text-sm text-gray-500">Supports JPG, PNG (Max 5MB)</p>
                    </>
                )}
                <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default AnalysisContent;
