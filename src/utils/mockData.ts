import { User, WeatherData } from '../types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    role: 'user'
  },
  {
    id: '3',
    username: 'john',
    password: 'john123',
    role: 'user'
  },
  {
    id: '4',
    username: 'sarah',
    password: 'sarah123',
    role: 'user'
  },
  {
    id: '5',
    username: 'manager',
    password: 'manager123',
    role: 'admin'
  }
];

// Mock weather data
export const initialWeatherData: WeatherData[] = [
  {
    id: '1',
    location: 'New York',
    temperature: 22,
    condition: 'sunny',
    humidity: 45,
    windSpeed: 8,
    date: new Date().toISOString(),
    createdBy: '1'
  },
  {
    id: '2',
    location: 'London',
    temperature: 15,
    condition: 'rainy',
    humidity: 80,
    windSpeed: 12,
    date: new Date().toISOString(),
    createdBy: '1'
  },
  {
    id: '3',
    location: 'Tokyo',
    temperature: 28,
    condition: 'cloudy',
    humidity: 60,
    windSpeed: 5,
    date: new Date().toISOString(),
    createdBy: '1'
  }
];

// Get weather data from localStorage or use initial data
export const getWeatherData = (): WeatherData[] => {
  const storedData = localStorage.getItem('weatherData');
  return storedData ? JSON.parse(storedData) : initialWeatherData;
};

// Save weather data to localStorage
export const saveWeatherData = (data: WeatherData[]): void => {
  localStorage.setItem('weatherData', JSON.stringify(data));
};

// Add new weather data
export const addWeatherData = (data: Omit<WeatherData, 'id' | 'date'>, userId: string): WeatherData[] => {
  const currentData = getWeatherData();
  const newWeatherData: WeatherData = {
    ...data,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    createdBy: userId
  };
  
  const updatedData = [...currentData, newWeatherData];
  saveWeatherData(updatedData);
  return updatedData;
};

// Delete weather data
export const deleteWeatherData = (id: string): WeatherData[] => {
  const currentData = getWeatherData();
  const updatedData = currentData.filter(item => item.id !== id);
  saveWeatherData(updatedData);
  return updatedData;
};

// Update weather data
export const updateWeatherData = (id: string, data: Partial<WeatherData>): WeatherData[] => {
  const currentData = getWeatherData();
  const updatedData = currentData.map(item => 
    item.id === id ? { ...item, ...data } : item
  );
  saveWeatherData(updatedData);
  return updatedData;
};