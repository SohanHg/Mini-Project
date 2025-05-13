import React from 'react';
import { useStore } from '../stores/useStore';
import { UserIcon, PhoneIcon, BriefcaseIcon } from 'lucide-react';

const EmployeeList: React.FC = () => {
  const { employees, loading } = useStore();

  if (loading) {
    return <div className="p-4">Loading employees...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee Directory</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 rounded-full p-3">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    <span>{employee.role}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneIcon className="h-4 w-4 mr-2" />
                    <span>{employee.contactNumber}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {employee.department}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;