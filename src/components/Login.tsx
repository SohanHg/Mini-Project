import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BoltIcon } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && userId.trim()) {
      await login(username, userId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-blue-600 p-6 flex flex-col items-center">
          <div className="bg-white p-3 rounded-full mb-4">
            <BoltIcon className="h-10 w-10 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">Karnataka Electric Department</h1>
          <p className="text-blue-100 text-center mt-1">Safety Board Portal</p>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Employee Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your ID (e.g., EMP001)"
                required
              />
            </div>
            
            {error && (
              <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>For employee access only.</p>
            <p className="mt-1">Contact IT support for login assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;