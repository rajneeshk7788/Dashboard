"use client";
import React, { useEffect, useState } from "react";

interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  description: string;
  icon: string;
  windSpeed: number;
  feelsLike: number;
}

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "3a7f56aba900425263aea0939154abd5";
        const lat = 22.7196;
        const lon = 75.8577;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        const formattedData = [
          {
            date: new Date().toLocaleDateString(),
            temp: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            windSpeed: data.wind.speed,
            feelsLike: data.main.feels_like,
          },
        ];

        setWeatherData(formattedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Dashboard</h1>
        <p className="text-gray-600 mb-8">Heres your daily overview and weather information</p>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <h3 className="text-2xl font-bold text-gray-800">24</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+3 new this week</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tasks Completed</p>
                <h3 className="text-2xl font-bold text-gray-800">156</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+8% from yesterday</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">$12,345</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-500 text-sm font-medium">+15% from last quarter</span>
            </div>
          </div>
        </div>

        {/* Weather Information */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Weather Information (Today)</h2>
          {loading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          {weatherData.length > 0 && (
            <div className="space-y-4">
              {weatherData.map((day, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <img 
                          src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                          alt={day.description}
                          className="w-16 h-16"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{day.temp}°C</h3>
                        <p className="text-gray-600 capitalize">{day.description}</p>
                        <p className="text-sm text-gray-500">Feels like: {day.feelsLike}°C</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Humidity</p>
                        <p className="text-lg font-semibold text-gray-700">{day.humidity}%</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Wind Speed</p>
                        <p className="text-lg font-semibold text-gray-700">{day.windSpeed} m/s</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-lg font-semibold text-gray-700">{day.date}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-lg font-semibold text-gray-700">Indore, IN</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;