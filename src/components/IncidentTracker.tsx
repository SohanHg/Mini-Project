import React, { useState } from 'react';
import { useStore } from '../stores/useStore';
import { AlertTriangleIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';

const IncidentTracker: React.FC = () => {
  const { incidents, employees, loading, addIncident } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangleIcon className="h-5 w-5 text-red-600" />;
      case 'high':
        return <AlertCircleIcon className="h-5 w-5 text-orange-600" />;
      case 'medium':
        return <AlertCircleIcon className="h-5 w-5 text-yellow-600" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return <div className="p-4">Loading incidents...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Incident Reports</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Report Incident
        </button>
      </div>

      <div className="space-y-4">
        {incidents.map((incident) => {
          const reporter = employees.find(emp => emp.id === incident.reported_by);
          
          return (
            <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getSeverityIcon(incident.severity)}
                  <div>
                    <h3 className="font-semibold text-gray-800">{incident.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{incident.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>Reported by: {reporter?.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full ${
                  incident.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {incident.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IncidentTracker;