import React from 'react';
import { Cloud, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout, isAdmin } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-sky-500" />
            <h1 className="text-xl font-bold text-gray-800">WeatherApp</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {currentUser?.username}
                <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600">
                  {isAdmin ? 'Admin' : 'User'}
                </span>
              </span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;