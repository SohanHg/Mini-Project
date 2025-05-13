import React from 'react';
import { 
  HomeIcon, 
  ActivityIcon, 
  UsersIcon, 
  CalendarIcon, 
  AlertTriangleIcon, 
  SettingsIcon,
  XIcon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  onSettingsClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar, onSettingsClick }) => {
  const menuItems = [
    { icon: <HomeIcon size={18} />, label: 'Dashboard', active: true },
    { icon: <ActivityIcon size={18} />, label: 'Power Grid', active: false },
    { icon: <UsersIcon size={18} />, label: 'Employees', active: false },
    { icon: <CalendarIcon size={18} />, label: 'Schedule', active: false },
    { icon: <AlertTriangleIcon size={18} />, label: 'Incidents', active: false },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-30 
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">KESB Portal</h2>
          <button 
            onClick={closeSidebar}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors md:hidden"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                    item.active 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={onSettingsClick}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-gray-300 hover:bg-gray-700"
              >
                <SettingsIcon size={18} />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            <p>Karnataka Electric Department</p>
            <p>Safety Board Portal v1.0</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;