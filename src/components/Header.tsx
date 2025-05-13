import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BoltIcon, LogOutIcon, MenuIcon, SettingsIcon } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, onSettingsClick }) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            
            <div className="flex items-center space-x-2">
              <BoltIcon className="h-7 w-7 text-yellow-300" />
              <div>
                <h1 className="text-lg font-bold leading-tight">Karnataka Electric</h1>
                <p className="text-xs text-blue-100 leading-tight">Safety Board</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-blue-100">ID: {user.id}</p>
                </div>
                <button
                  onClick={onSettingsClick}
                  className="p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <SettingsIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={logout}
                  className="p-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span className="hidden md:inline text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;