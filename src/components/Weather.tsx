"use client";

import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const data: WeatherData = await res.json();
        setWeather(data);
      } catch (err) {
        setError("Impossible de récupérer la météo");
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) return <p>⏳ Chargement...</p>;
  if (error) return <p className="text-red-500">❌ {error}</p>;

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">🌤️ Météo à {weather?.name}</h3>
      <p>🌡️ Température : {weather?.main.temp}°C</p>
      <p>💧 Humidité : {weather?.main.humidity}%</p>
      <p>💨 Vent : {weather?.wind.speed} m/s</p>
    </div>
  );
}
