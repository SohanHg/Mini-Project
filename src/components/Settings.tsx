import React, { useState } from 'react';
import { BellIcon, SunIcon, MoonIcon, BellOffIcon, GlobeIcon, UserIcon, ShieldIcon } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [autoLogout, setAutoLogout] = useState('30');

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {notifications ? (
              <BellIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <BellOffIcon className="h-5 w-5 text-gray-400" />
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">Receive alerts for critical updates</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {darkMode ? (
              <MoonIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <SunIcon className="h-5 w-5 text-yellow-500" />
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">Dark Mode</h3>
              <p className="text-sm text-gray-500">Toggle dark/light theme</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GlobeIcon className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Language</h3>
              <p className="text-sm text-gray-500">Select your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            <option value="en">English</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>

        {/* Auto Logout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">Auto Logout</h3>
              <p className="text-sm text-gray-500">Set inactivity timeout</p>
            </div>
          </div>
          <select
            value={autoLogout}
            onChange={(e) => setAutoLogout(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        {/* Security Section */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldIcon className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-900">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              Two-Factor Authentication
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              Login History
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;