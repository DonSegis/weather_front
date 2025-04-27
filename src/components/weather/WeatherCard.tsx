import React from "react";
import { WeatherData } from "../../types";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Droplets,
  Wind,
  MapPin,
  CalendarDays,
  Trash2,
} from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  onDelete,
  isAdmin = false,
}) => {
  const getWeatherIcon = () => {
    switch (data.condition) {
      case "Sunny":
        return <Sun className="h-12 w-12 text-yellow-500" />;
      case "Cloudy":
        return <Cloud className="h-12 w-12 text-gray-400" />;
      case "Rainy":
        return <CloudRain className="h-12 w-12 text-blue-400" />;
      case "Stormy":
        return <CloudLightning className="h-12 w-12 text-purple-500" />;
      case "Snowy":
        return <CloudSnow className="h-12 w-12 text-blue-200" />;
      default:
        return <Sun className="h-12 w-12 text-yellow-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (data.condition) {
      case "Sunny":
        return "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200";
      case "Cloudy":
        return "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200";
      case "Rainy":
        return "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200";
      case "Stormy":
        return "bg-gradient-to-br from-purple-50 to-slate-50 border-purple-200";
      case "Snowy":
        return "bg-gradient-to-br from-blue-50 to-slate-50 border-blue-100";
      default:
        return "bg-white border-gray-200";
    }
  };

  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-md ${getBackgroundColor()}`}
    >
      {isAdmin && onDelete && (
        <button
          onClick={() => onDelete(data.documentId)}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-white/50 transition-colors"
          aria-label="Delete weather data"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-1">
              <MapPin className="h-4 w-4 text-slate-500 mr-1" />
              <h3 className="text-lg font-semibold text-slate-800">
                {data.location}
              </h3>
            </div>
            <div className="flex items-center text-xs text-slate-500">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="flex items-center">{getWeatherIcon()}</div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-slate-800">
              {data.temperature}°
            </span>
            <span className="ml-1 text-sm text-slate-500">C</span>
          </div>

          <div className="text-sm capitalize text-slate-600">
            {data.condition}
          </div>
        </div>

        <div className="flex justify-between mt-2 pt-3 border-t border-slate-200">
          <div className="flex items-center text-sm text-slate-600">
            <Droplets className="h-4 w-4 mr-1 text-blue-500" />
            <span>{data.humidity}%</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Wind className="h-4 w-4 mr-1 text-slate-400" />
            <span>{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
