import React, { useState } from 'react';
import { useStore } from '../stores/useStore';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { format } from 'date-fns';

const ScheduleManager: React.FC = () => {
  const { schedules, employees, loading, updateSchedule } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const formatTime = (date: string) => {
    return format(new Date(date), 'MMM dd, yyyy HH:mm');
  };

  if (loading) {
    return <div className="p-4">Loading schedules...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Work Schedules</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Schedule
        </button>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => {
          const employee = employees.find(emp => emp.id === schedule.employee_id);
          
          return (
            <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{employee?.name}</h3>
                    <p className="text-sm text-gray-500">{employee?.role}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  schedule.type === 'regular' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {schedule.type}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>Start: {formatTime(schedule.shift_start)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4" />
                  <span>End: {formatTime(schedule.shift_end)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleManager;