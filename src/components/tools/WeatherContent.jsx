import React, { useState, useEffect } from 'react';

const BACKEND_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '';

const DEFAULT_LAT = 10.96;
const DEFAULT_LON = 78.08;

function WeatherContent() {
    const [weather, setWeather] = useState({
        temp: '--',
        humidity: '--',
        wind: '--',
        rain: '--',
        location: 'Detecting Location...'
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchWeather(DEFAULT_LAT, DEFAULT_LON);
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            setError(false);
            setLoading(true);

            const url = `${BACKEND_BASE}/api/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Weather proxy error: ${res.status}`);
            }

            const data = await res.json();

            setWeather({
                temp: data.main?.temp ? `${Math.round(data.main.temp)}°C` : '--°C',
                humidity: data.main?.humidity ? `${data.main.humidity}%` : '--%',
                wind: data.wind?.speed ? `${Math.round(data.wind.speed * 3.6)} km/h` : '-- km/h',
                rain: (data.rain?.['1h'] ? `${data.rain['1h']} mm` : (data.snow?.['1h'] ? `${data.snow['1h']} mm` : '0 mm')),
                location: data.name ? `${data.name}, ${data.sys?.country || ''}` : `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`
            });
            setLoading(false);
        } catch (err) {
            console.error('fetchWeather error', err);
            setError(true);
            setLoading(false);
            setWeather({
                temp: '--°C',
                humidity: '--%',
                wind: '-- km/h',
                rain: '--',
                location: 'Location unavailable'
            });
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    setError(true);
                    setLoading(false);
                    fetchWeather(DEFAULT_LAT, DEFAULT_LON);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 text-white mb-8 relative overflow-hidden border border-blue-500/30">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/50 to-transparent"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center mb-2">
                                <i className="fas fa-map-marker-alt text-blue-300 mr-2"></i>
                                <span className="text-blue-100 font-medium tracking-wide">{weather.location}</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-1 tracking-tight">Current Weather</h2>
                            <p className="text-blue-200 text-sm">Real-time agricultural weather data</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <div className="text-6xl font-bold tracking-tighter">{weather.temp}</div>
                            <button
                                onClick={handleGetLocation}
                                disabled={loading}
                                className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full transition-all flex items-center backdrop-blur-sm disabled:opacity-50"
                            >
                                <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-location-arrow'} mr-2`}></i>
                                Use My Location
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="text-center bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                            <i className="fas fa-tint text-blue-300 text-2xl mb-2"></i>
                            <div className="text-2xl font-bold">{weather.humidity}</div>
                            <div className="text-xs text-blue-200 uppercase tracking-wider">Humidity</div>
                        </div>
                        <div className="text-center bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                            <i className="fas fa-wind text-gray-300 text-2xl mb-2"></i>
                            <div className="text-2xl font-bold">{weather.wind}</div>
                            <div className="text-xs text-blue-200 uppercase tracking-wider">Wind Speed</div>
                        </div>
                        <div className="text-center bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                            <i className="fas fa-cloud-rain text-blue-300 text-2xl mb-2"></i>
                            <div className="text-2xl font-bold">{weather.rain}</div>
                            <div className="text-xs text-blue-200 uppercase tracking-wider">Precipitation</div>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-white flex items-center">
                            <i className="fas fa-exclamation-circle mr-2"></i>
                            <span>Unable to load weather data. Please check connection.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WeatherContent;
