import React, { useState } from 'react';
import { WorkProject, Employee } from '../types';
import { CalendarIcon, MapPinIcon, ClockIcon, AlertCircleIcon, Edit2Icon } from 'lucide-react';
import { employees } from '../data/mockData';
import UpdateWorkStatus from './UpdateWorkStatus';

interface WorkCardProps {
  project: WorkProject;
  onUpdateStatus: (id: string, newStatus: string, notes: string) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ project, onUpdateStatus }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
    }).format(date);
  };

  const calculateRemainingTime = (endTimeStr: string) => {
    const now = new Date();
    const endTime = new Date(endTimeStr);
    
    if (project.status === 'completed') return 'Completed';
    if (now > endTime) return 'Overdue';
    
    const diffMs = endTime.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m remaining`;
  };

  // Find assigned employees
  const assignedEmployeeData = employees.filter(emp => 
    project.assignedEmployees.includes(emp.id)
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="border-l-4 border-blue-600 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
            <div className="flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </div>
              <button
                onClick={() => setShowUpdateModal(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Update Status"
              >
                <Edit2Icon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{project.location}</span>
            <div className="mx-2 h-1 w-1 bg-gray-500 rounded-full"></div>
            <div className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
              <CalendarIcon className="h-3 w-3 mr-1 text-blue-500" />
              <span>Start: {formatDate(project.startTime)}</span>
            </div>
            <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
              <ClockIcon className="h-3 w-3 mr-1 text-blue-500" />
              <span>End: {formatDate(project.estimatedEndTime)}</span>
            </div>
            <div className="flex items-center text-xs bg-blue-50 px-2 py-1 rounded">
              <AlertCircleIcon className="h-3 w-3 mr-1 text-blue-500" />
              <span>{calculateRemainingTime(project.estimatedEndTime)}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-3">
            <h4 className="text-xs font-semibold text-gray-500 mb-2">ASSIGNED PERSONNEL</h4>
            <div className="space-y-2">
              {assignedEmployeeData.map(emp => (
                <div key={emp.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium text-gray-800">{emp.name}</span>
                    <span className="text-gray-500 ml-2">({emp.role})</span>
                  </div>
                  <div className="text-blue-600">{emp.contactNumber}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <UpdateWorkStatus
            project={project}
            onUpdate={onUpdateStatus}
            onClose={() => setShowUpdateModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default WorkCard;