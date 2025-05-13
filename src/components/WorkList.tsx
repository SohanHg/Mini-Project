import React, { useState } from 'react';
import { WorkProject } from '../types';
import WorkCard from './WorkCard';
import NewWorkForm from './NewWorkForm';
import { PlusIcon } from 'lucide-react';

interface WorkListProps {
  projects: WorkProject[];
  onUpdateStatus: (id: string, newStatus: string, notes: string) => void;
}

const WorkList: React.FC<WorkListProps> = ({ projects, onUpdateStatus }) => {
  const [showNewWorkModal, setShowNewWorkModal] = useState(false);
  
  // Group projects by status
  const inProgress = projects.filter(project => project.status === 'in-progress');
  const pending = projects.filter(project => project.status === 'pending');
  const delayed = projects.filter(project => project.status === 'delayed');
  const completed = projects.filter(project => project.status === 'completed');

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Work Management</h2>
          <button
            onClick={() => setShowNewWorkModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Work</span>
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            In Progress Works
          </h2>
          {inProgress.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {inProgress.map(project => (
                <WorkCard 
                  key={project.id} 
                  project={project} 
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No in-progress works at the moment.</p>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            Pending Works
          </h2>
          {pending.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pending.map(project => (
                <WorkCard 
                  key={project.id} 
                  project={project} 
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No pending works at the moment.</p>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            Delayed Works
          </h2>
          {delayed.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {delayed.map(project => (
                <WorkCard 
                  key={project.id} 
                  project={project} 
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No delayed works at the moment.</p>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Recently Completed
          </h2>
          {completed.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completed.map(project => (
                <WorkCard 
                  key={project.id} 
                  project={project} 
                  onUpdateStatus={onUpdateStatus}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No completed works to display.</p>
          )}
        </div>
      </div>

      {/* New Work Modal */}
      {showNewWorkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <NewWorkForm onClose={() => setShowNewWorkModal(false)} />
        </div>
      )}
    </>
  );
};

export default WorkList;