// import React, { useState, useEffect } from 'react';
// import Header from '../components/layout/Header';
// import WeatherCard from '../components/weather/WeatherCard';
// import { WeatherData } from '../types';
// import { getWeatherData } from '../utils/mockData';
// import { Search } from 'lucide-react';

// const UserDashboard: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState<WeatherData[]>([]);

//   useEffect(() => {
//     // Load initial weather data
//     const data = getWeatherData();
//     setWeatherData(data);
//     setFilteredData(data);
//   }, []);

//   useEffect(() => {
//     // Filter weather data based on search term
//     if (!searchTerm.trim()) {
//       setFilteredData(weatherData);
//       return;
//     }

//     const filtered = weatherData.filter((data) =>
//       data.location.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredData(filtered);
//   }, [searchTerm, weatherData]);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header />

//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-slate-800">Weather Dashboard</h1>

//           <div className="relative max-w-xs md:max-w-sm w-full">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search className="h-5 w-5 text-slate-400" />
//             </div>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
//               placeholder="Search by location..."
//             />
//           </div>
//         </div>

//         {filteredData.length === 0 ? (
//           <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
//             <p className="text-slate-600">
//               {searchTerm
//                 ? `No weather data found for "${searchTerm}"`
//                 : "No weather data available."}
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {filteredData.map((data) => (
//               <WeatherCard key={data.id} data={data} />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default UserDashboard;
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import WeatherCard from "../components/weather/WeatherCard";
import { WeatherData } from "../types";
import { getWeather } from "../services/weather"; // <-- importar tu función real
import { Search } from "lucide-react";

const UserDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeather();
        const normalized = response.data.map((item: any) => ({
          id: item.id,
          location: item.location,
          temperature: item.temperature,
          humidity: item.humidity,
          windSpeed: item.wind_speed,
          condition: item.condition,
          date: item.date,
        }));
        setWeatherData(normalized);
        setFilteredData(normalized);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(weatherData);
      return;
    }
    const filtered = weatherData.filter((data) =>
      data.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, weatherData]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Weather Dashboard
          </h1>
          <div className="relative max-w-xs md:max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="Search by location..."
            />
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
            <p className="text-slate-600">
              {searchTerm
                ? `No weather data found for "${searchTerm}"`
                : "No weather data available."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.map((data) => (
              <WeatherCard key={data.id} data={data} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
