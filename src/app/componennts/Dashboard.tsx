"use client";
import React, { useEffect, useState } from "react";

interface WeatherData {
  date: string;
  temp: number;
  humidity: number;
  description: string;
}

const Dashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "3a7f56aba900425263aea0939154abd5"; // Replace with your OpenWeatherMap API key
        const lat = 22.7196; // Latitude for Indore
        const lon = 75.8577; // Longitude for Indore
    
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
          },
        ];
    
        setWeatherData(formattedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Card 1</h2>
          <p>Details about card 1.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Card 2</h2>
          <p>Details about card 2.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Card 3</h2>
          <p>Details about card 3.</p>
        </div>
      </div>

      {/* Weather Information */}
      <div className="mt-8 bg-blue-100 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Weather Information (Todays)</h2>
        {loading && <p>Loading weather data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {weatherData.length > 0 && (
          <div>
            {weatherData.map((day, index) => (
              <div key={index} className="mb-4">
                <p>
                  <strong>Date:</strong> {day.date}
                </p>
                <p>
                  <strong>Temperature:</strong> {day.temp}°C
                </p>
                <p>
                  <strong>Humidity:</strong> {day.humidity}%
                </p>
                <p>
                  <strong>Description:</strong> {day.description}
                </p>
                <hr className="my-2" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;