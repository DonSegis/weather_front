// import React, { useState, useEffect } from "react";
// import Header from "../components/layout/Header";
// import WeatherForm from "../components/weather/WeatherForm";
// import WeatherCard from "../components/weather/WeatherCard";
// import { useAuth } from "../contexts/AuthContext";
// import { WeatherData } from "../types";
// import { getWeather, createWeather, deleteWeather } from "../services/weather"; // <-- importar tus funciones reales

// const AdminDashboard: React.FC = () => {
//   const { currentUser } = useAuth();
//   const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const response = await getWeather();
//         console.log("Weather data response:", response);
//         const normalized = response.data.map((item: any) => ({
//           id: item.id,
//           documentId: item.documentId,
//           location: item.location,
//           temperature: item.temperature,
//           humidity: item.humidity,
//           windSpeed: item.wind_speed,
//           condition: item.condition,
//           date: item.date,
//         }));
//         console.log("Weather data:", normalized);
//         setWeatherData(normalized);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchWeather();
//   }, []);

//   const handleAddWeatherData = async (
//     data: Omit<WeatherData, "id" | "date">
//   ) => {
//     if (!currentUser) return;
//     try {
//       await createWeather({
//         ...data,
//         date: new Date().toISOString(),
//         user: currentUser.id,
//       });
//       // Volver a cargar
//       const response = await getWeather();
//       const normalized = response.data.map((item: any) => ({
//         id: item.id,
//         location: item.attributes.location,
//         temperature: item.attributes.temperature,
//         humidity: item.attributes.humidity,
//         windSpeed: item.attributes.wind_speed,
//         condition: item.attributes.condition,
//         date: item.attributes.date,
//       }));
//       setWeatherData(normalized);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteWeatherData = async (documentId: string) => {
//     try {
//       console.log("Deleting weather data with documentId:", documentId);
//       await deleteWeather(documentId);
//       // Volver a cargar
//       const response = await getWeather();
//       const normalized = response.data.map((item: any) => ({
//         id: item.id,
//         location: item.attributes.location,
//         temperature: item.attributes.temperature,
//         humidity: item.attributes.humidity,
//         windSpeed: item.attributes.wind_speed,
//         condition: item.attributes.condition,
//         date: item.attributes.date,
//       }));
//       console.log("Weather data after deletion:", normalized);
//       setWeatherData(normalized);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header />
//       <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-1">
//             <WeatherForm onSubmit={handleAddWeatherData} />
//           </div>

//           <div className="lg:col-span-3">
//             <h2 className="text-xl font-semibold text-slate-800 mb-4">
//               Current Weather Data
//             </h2>
//             {weatherData.length === 0 ? (
//               <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
//                 <p className="text-slate-600">
//                   No weather data available. Add some using the form.
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {weatherData.map((data) => (
//                   <WeatherCard
//                     key={data.id}
//                     data={data}
//                     onDelete={handleDeleteWeatherData}
//                     isAdmin={true}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import WeatherForm from "../components/weather/WeatherForm";
import WeatherCard from "../components/weather/WeatherCard";
import { useAuth } from "../contexts/AuthContext";
import { WeatherData } from "../types";
import { getWeather, createWeather, deleteWeather } from "../services/weather";

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const fetchWeather = async () => {
    try {
      const response = await getWeather();
      const normalized = response.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        location: item.location,
        temperature: item.temperature,
        humidity: item.humidity,
        windSpeed: item.wind_speed, // <-- cuidado con este
        condition: item.condition,
        date: item.date,
      }));
      setWeatherData(normalized);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleAddWeatherData = async (
    data: Omit<WeatherData, "id" | "documentId" | "date">
  ) => {
    if (!currentUser) return;
    try {
      console.log("Adding weather data:", data);

      const mappedData = {
        location: data.location,
        temperature: data.temperature,
        humidity: data.humidity,
        wind_speed: data.windSpeed, // ✅ corregimos aquí
        condition: capitalizeFirstLetter(data.condition), // ✅ corregimos aquí
        date: new Date().toISOString().split("T")[0], // formato YYYY-MM-DD
      };

      await createWeather(mappedData);
      await fetchWeather(); // recargar
    } catch (error) {
      console.error(error);
    }
  };

  // Capitalizar la primera letra
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleDeleteWeatherData = async (documentId: string) => {
    try {
      await deleteWeather(documentId); // aquí eliminamos usando documentId
      await fetchWeather(); // vuelve a cargar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <WeatherForm onSubmit={handleAddWeatherData} />
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Current Weather Data
            </h2>
            {weatherData.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
                <p className="text-slate-600">
                  No weather data available. Add some using the form.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weatherData.map((data) => (
                  <WeatherCard
                    key={data.id}
                    data={data}
                    onDelete={handleDeleteWeatherData} // pasa documentId
                    isAdmin={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
