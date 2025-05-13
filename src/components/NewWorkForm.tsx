import React, { useState } from 'react';
import { useStore } from '../stores/useStore';
import { MapPinIcon, CalendarIcon, UsersIcon } from 'lucide-react';

const NewWorkForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { employees, addNewWork } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    priority: 'medium',
    startTime: '',
    estimatedEndTime: '',
    assignedEmployees: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await addNewWork({
      ...formData,
      status: 'pending'
    });
    
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Create New Work</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated End Time
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                value={formData.estimatedEndTime}
                onChange={(e) => setFormData({ ...formData, estimatedEndTime: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign Employees
          </label>
          <div className="relative">
            <UsersIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <select
              multiple
              value={formData.assignedEmployees}
              onChange={(e) => setFormData({
                ...formData,
                assignedEmployees: Array.from(e.target.selectedOptions, option => option.value)
              })}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              required
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.role}
                </option>
              ))}
            </select>
          </div>
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
            Create Work
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewWorkForm;