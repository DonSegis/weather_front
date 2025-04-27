import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Cloud } from 'lucide-react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center space-x-2 mb-8">
        <Cloud className="h-12 w-12 text-sky-500" />
        <h1 className="text-3xl font-bold text-slate-800">WeatherApp</h1>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>Your comprehensive weather tracking solution.</p>
        <p>© 2025 WeatherApp. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;