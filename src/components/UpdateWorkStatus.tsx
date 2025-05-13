import React, { useState } from 'react';
import { WorkProject } from '../types';
import { ClockIcon, AlertCircleIcon } from 'lucide-react';

interface UpdateWorkStatusProps {
  project: WorkProject;
  onUpdate: (id: string, newStatus: string, notes: string) => void;
  onClose: () => void;
}

const UpdateWorkStatus: React.FC<UpdateWorkStatusProps> = ({ project, onUpdate, onClose }) => {
  const [status, setStatus] = useState(project.status);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(project.id, status, notes);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Update Work Status</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-500">{project.location}</p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>Started: {new Date(project.startTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            <span>Due: {new Date(project.estimatedEndTime).toLocaleDateString()}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any relevant notes about the status update..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Status
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateWorkStatus;