import React, { useState } from 'react';

function LibraryContent() {
    const [searchQuery, setSearchQuery] = useState('');

    const articles = [
        {
            category: 'Soil Health',
            title: 'Understanding NPK Ratios',
            description: 'A comprehensive guide to nitrogen, phosphorus, and potassium...'
        },
        {
            category: 'Pest Control',
            title: 'Integrated Pest Management',
            description: 'Learn about sustainable pest control methods...'
        },
        {
            category: 'Irrigation',
            title: 'Water Conservation Techniques',
            description: 'Efficient irrigation methods for modern farming...'
        }
    ];

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="glass-panel rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Knowledge Library</h3>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-900/50 border border-gray-700 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:border-green-500 w-64"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-500"></i>
                </div>
            </div>
            <div className="space-y-4">
                {filteredArticles.map((article, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors border border-gray-700/50 cursor-pointer group"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold text-green-400 uppercase tracking-wide mb-1 block">
                                    {article.category}
                                </span>
                                <h4 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                                    {article.title}
                                </h4>
                                <p className="text-sm text-gray-400 mt-1">{article.description}</p>
                            </div>
                            <i className="fas fa-chevron-right text-gray-600 group-hover:text-white transition-colors"></i>
                        </div>
                    </div>
                ))}
                {filteredArticles.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <i className="fas fa-search text-4xl mb-4"></i>
                        <p>No articles found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LibraryContent;
