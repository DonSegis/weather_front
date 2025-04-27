import React, { useState } from "react";
import { MapPin, Thermometer, Droplets, Wind, CloudIcon } from "lucide-react";

type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Stormy" | "Snowy";

interface WeatherFormProps {
  onSubmit: (data: {
    location: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: WeatherCondition;
  }) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState<number | "">("");
  const [humidity, setHumidity] = useState<number | "">("");
  const [windSpeed, setWindSpeed] = useState<number | "">("");
  const [condition, setCondition] = useState<WeatherCondition>("Sunny");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!location) {
      setError("Location is required");
      return;
    }
    if (temperature === "") {
      setError("Temperature is required");
      return;
    }
    if (humidity === "") {
      setError("Humidity is required");
      return;
    }
    if (windSpeed === "") {
      setError("Wind speed is required");
      return;
    }

    onSubmit({
      location,
      temperature: Number(temperature),
      humidity: Number(humidity),
      windSpeed: Number(windSpeed),
      condition,
    });

    // Reset form
    setLocation("");
    setTemperature("");
    setHumidity("");
    setWindSpeed("");
    setCondition("Sunny");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Add Weather Data
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="location"
            className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1"
          >
            <MapPin className="h-4 w-4 text-sky-500" />
            <span>Location</span>
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. New York"
          />
        </div>

        <div>
          <label
            htmlFor="temperature"
            className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1"
          >
            <Thermometer className="h-4 w-4 text-rose-500" />
            <span>Temperature (°C)</span>
          </label>
          <input
            id="temperature"
            type="number"
            value={temperature}
            onChange={(e) =>
              setTemperature(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 25"
          />
        </div>

        <div>
          <label
            htmlFor="humidity"
            className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1"
          >
            <Droplets className="h-4 w-4 text-blue-500" />
            <span>Humidity (%)</span>
          </label>
          <input
            id="humidity"
            type="number"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) =>
              setHumidity(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 70"
          />
        </div>

        <div>
          <label
            htmlFor="windSpeed"
            className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1"
          >
            <Wind className="h-4 w-4 text-slate-500" />
            <span>Wind Speed (km/h)</span>
          </label>
          <input
            id="windSpeed"
            type="number"
            min="0"
            value={windSpeed}
            onChange={(e) =>
              setWindSpeed(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 10"
          />
        </div>

        <div>
          <label
            htmlFor="condition"
            className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-1"
          >
            <CloudIcon className="h-4 w-4 text-slate-500" />
            <span>Weather Condition</span>
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as WeatherCondition)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="sunny">Sunny</option>
            <option value="cloudy">Cloudy</option>
            <option value="rainy">Rainy</option>
            <option value="stormy">Stormy</option>
            <option value="snowy">Snowy</option>
          </select>
        </div>

        {error && (
          <div className="p-2 text-sm text-red-500 bg-red-50 rounded border border-red-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Add Weather Data
        </button>
      </form>
    </div>
  );
};

export default WeatherForm;
