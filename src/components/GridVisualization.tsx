import React, { useMemo } from 'react';
import { GridSection } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GridVisualizationProps {
  gridSections: GridSection[];
}

const GridVisualization: React.FC<GridVisualizationProps> = ({ gridSections }) => {
  // Get status color classes
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'maintenance': return 'bg-yellow-500';
      case 'alert': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  // Get status text classes
  const getStatusTextClass = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-700 bg-green-100';
      case 'offline': return 'text-gray-700 bg-gray-100';
      case 'maintenance': return 'text-yellow-700 bg-yellow-100';
      case 'alert': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  // Get load color based on percentage
  const getLoadColor = (load: number) => {
    if (load >= 90) return 'text-red-600';
    if (load >= 70) return 'text-orange-600';
    if (load >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    const online = gridSections.filter(grid => grid.status === 'online').length;
    const offline = gridSections.filter(grid => grid.status === 'offline').length;
    const maintenance = gridSections.filter(grid => grid.status === 'maintenance').length;
    const alert = gridSections.filter(grid => grid.status === 'alert').length;
    
    const totalLoad = gridSections.reduce((sum, grid) => sum + grid.load, 0);
    const avgLoad = Math.round(totalLoad / gridSections.length);
    
    return { online, offline, maintenance, alert, avgLoad };
  }, [gridSections]);

  // Prepare data for the line chart
  const chartData = gridSections
    .filter(section => section.status !== 'offline')
    .map(section => ({
      name: section.name.split(' ')[0],
      load: section.load,
      status: section.status
    }));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800">Power Grid Status</h2>
      </div>
      
      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 border-b border-gray-200">
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <span className="text-sm text-gray-600">Online</span>
          <p className="text-2xl font-bold text-green-600">{statistics.online}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <span className="text-sm text-gray-600">Offline</span>
          <p className="text-2xl font-bold text-gray-600">{statistics.offline}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <span className="text-sm text-gray-600">Maintenance</span>
          <p className="text-2xl font-bold text-yellow-600">{statistics.maintenance}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-3 text-center">
          <span className="text-sm text-gray-600">Alerts</span>
          <p className="text-2xl font-bold text-red-600">{statistics.alert}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <span className="text-sm text-gray-600">Avg Load</span>
          <p className="text-2xl font-bold text-blue-600">{statistics.avgLoad}%</p>
        </div>
      </div>

      {/* Load Chart */}
      <div className="p-4 border-b border-gray-200">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="load" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Grid Sections List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Load</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connections</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gridSections.map((section) => (
              <tr key={section.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${getStatusColorClass(section.status)} mr-2`}></div>
                    <div className="text-sm font-medium text-gray-900">{section.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {section.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusTextClass(section.status)}`}>
                    {section.status.charAt(0).toUpperCase() + section.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${section.status === 'offline' ? 'bg-gray-400' : 'bg-blue-600'}`}
                      style={{ width: `${section.load}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${getLoadColor(section.load)}`}>
                    {section.load}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {section.connectedTo.length > 0 ? section.connectedTo.join(', ') : 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GridVisualization;