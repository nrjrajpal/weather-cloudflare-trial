"use client";

import { useState } from "react";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { AirQuality } from "./components/AirQuality";
import { Forecast } from "./components/Forecast";
import { Astronomy } from "./components/Astronomy";
import { Sports } from "./components/Sports";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { WeatherData, AstronomyData, SportsData } from "./types/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [astronomyData, setAstronomyData] = useState<AstronomyData | null>(
    null
  );
  const [sportsData, setSportsData] = useState<SportsData | null>(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      setWeatherData(null);
      setAstronomyData(null);
      setSportsData(null);

      const [weatherResponse, astronomyResponse, sportsResponse] =
        await Promise.all([
          fetch(`/api/weather?city=${encodeURIComponent(city)}`),
          fetch(`/api/astronomy?city=${encodeURIComponent(city)}`),
          fetch(`/api/sports?city=${encodeURIComponent(city)}`),
        ]);

      const weatherData: WeatherData = await weatherResponse.json();
      const astronomyData: AstronomyData = await astronomyResponse.json();
      const sportsData: SportsData = await sportsResponse.json();

      if (
        "error" in weatherData ||
        "error" in astronomyData ||
        "error" in sportsData
      ) {
        setError(
          "An error occurred while fetching data. Please check the city name and try again."
        );
      } else {
        setWeatherData(weatherData);
        setAstronomyData(astronomyData);
        setSportsData(sportsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow"
        />
        <Button onClick={fetchData}>Search</Button>
      </div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {weatherData && (
        <div className="space-y-4">
          <div className="flex group h-fit gap-4">
            <div className="flex-grow min-h-full bg-slate-50">
              <WeatherDisplay
                data={weatherData.current}
                location={weatherData.location}
              />
            </div>
            <div className="flex-grow min-h-full bg-slate-50">
              <AirQuality data={weatherData.current.air_quality} />
            </div>
          </div>
          <Forecast data={weatherData.forecast.forecastday} />
          {astronomyData && <Astronomy data={astronomyData} />}
          {sportsData && <Sports data={sportsData} />}
        </div>
      )}
    </main>
  );
}
