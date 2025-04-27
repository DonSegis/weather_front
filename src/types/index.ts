export interface User {
  id: number;
  username: string;
  email: string;
  rol: "Admin" | "User";
}

export type WeatherData = {
  id: string;
  location: string;
  temperature: number;
  condition: "Sunny" | "Cloudy" | "Rainy" | "Stormy" | "Snowy";
  humidity: number;
  windSpeed: number;
  date: string;
  createdBy: string;
};

export type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
};
