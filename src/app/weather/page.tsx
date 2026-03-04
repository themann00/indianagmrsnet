"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Wind, Thermometer, MapPin } from "lucide-react";

// Mock Weather Data (In a real app, this would fetch from NWS or OpenWeatherMap)
const MOCK_WEATHER = {
    city: "Indianapolis",
    temp: 42,
    condition: "Cloudy",
    humidity: "68%",
    wind: "12 mph NW",
    forecast: [
        { day: "Today", temp: 45, icon: Cloud },
        { day: "Thu", temp: 48, icon: Sun },
        { day: "Fri", temp: 38, icon: CloudRain },
        { day: "Sat", temp: 35, icon: Wind },
    ],
};

export default function WeatherPage() {
    const [current, setCurrent] = useState<any>(null);
    const [forecast, setForecast] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            try {
                // Indianapolis Coordinates
                const lat = 39.7684;
                const lon = -86.1581;
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`
                );
                const data = await response.json();

                setCurrent(data.current);

                // Map the next 4 days of forecast
                const forecastData = data.daily.time.slice(0, 4).map((time: string, i: number) => {
                    const date = new Date(time);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    return {
                        day: i === 0 ? "Today" : dayName,
                        temp: Math.round(data.daily.temperature_2m_max[i]),
                        code: data.daily.weather_code[i]
                    };
                });
                setForecast(forecastData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching weather:", error);
                setLoading(false);
            }
        }
        fetchWeather();
    }, []);

    const getWeatherIcon = (code: number) => {
        if (code <= 3) return Sun;
        if (code <= 48) return Cloud;
        if (code <= 67 || code >= 80) return CloudRain;
        return Wind;
    };

    const getWeatherDesc = (code: number) => {
        if (code === 0) return "Clear Sky";
        if (code <= 3) return "Partly Cloudy";
        if (code <= 48) return "Foggy / Cloudy";
        if (code <= 67) return "Rain Showers";
        if (code >= 80) return "Active Precipitation";
        return "Windy Conditions";
    };

    if (loading) {
        return <div className="max-w-7xl mx-auto px-4 py-24 text-center text-text-secondary animate-pulse">Gathering Indianapolis meteorology...</div>;
    }

    const WeatherIcon = getWeatherIcon(current?.weather_code || 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Local Weather</h1>
                    <p className="text-text-secondary">Real-time conditions for the Indianapolis coverage area.</p>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary glass px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4" />
                    <span>Indianapolis Metro</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Condition */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 glass-card p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
                >
                    <div className="z-10">
                        <div className="text-8xl font-bold text-white mb-4 flex items-start">
                            {Math.round(current?.temperature_2m || 0)}<span className="text-4xl text-accent-primary mt-4">°F</span>
                        </div>
                        <div className="text-2xl text-text-secondary font-medium mb-8">
                            {getWeatherDesc(current?.weather_code || 0)}
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            <div className="flex items-center space-x-2">
                                <Thermometer className="w-5 h-5 text-accent-primary" />
                                <span className="text-text-secondary">Feels like: <span className="text-white">{Math.round(current?.apparent_temperature || 0)}°</span></span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Wind className="w-5 h-5 text-accent-primary" />
                                <span className="text-text-secondary">Wind: <span className="text-white">{Math.round(current?.wind_speed_10m || 0)} mph</span></span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CloudRain className="w-5 h-5 text-accent-primary" />
                                <span className="text-text-secondary">Humidity: <span className="text-white">{current?.relative_humidity_2m}%</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-8 md:mt-0">
                        <Cloud className="w-48 h-48 text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <WeatherIcon className={`w-32 h-32 ${current?.is_day ? 'text-orange-400' : 'text-blue-400'} drop-shadow-[0_0_30px_rgba(251,146,60,0.3)]`} />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Forecast */}
                <div className="space-y-4">
                    <h3 className="text-white font-semibold px-2">4-Day Outlook</h3>
                    {forecast.map((item, idx) => {
                        const ForecastIcon = getWeatherIcon(item.code);
                        return (
                            <motion.div
                                key={item.day}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass p-5 rounded-xl flex items-center justify-between"
                            >
                                <span className="text-white font-medium w-16">{item.day}</span>
                                <ForecastIcon className="w-6 h-6 text-text-secondary" />
                                <span className="text-white font-bold">{item.temp}°</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="mt-12 p-6 glass rounded-xl border-emerald-500/20">
                <div className="flex items-center space-x-3 text-emerald-400 mb-2">
                    <Info className="w-5 h-5" />
                    <span className="font-semibold">Radio Operator's Note</span>
                </div>
                <p className="text-text-secondary text-sm">
                    Aviation weather reports and local Metars are useful for predicting propagation changes. During thermal inversions, unexpected "skip" may occur on the Zionsville repeater.
                </p>
            </div>
        </div>
    );
}

function Info(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
}
