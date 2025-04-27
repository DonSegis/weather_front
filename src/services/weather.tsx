/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "./api";

export const getWeather = async () => {
  try {
    const response = await api.get(`/api/weathers`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching weather data");
  }
};

export const createWeather = async (weatherData: any) => {
  console.log("Creating weather data:", weatherData);
  try {
    const response = await api.post(`/api/weathers`, { data: weatherData });
    return response.data;
  } catch (error) {
    throw new Error("Error creating weather data");
  }
};

export const deleteWeather = async (documentId: string) => {
  console.log("Deleting weather data with documentId:", documentId);
  try {
    const response = await api.delete(`/api/weathers/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting weather data");
  }
};
