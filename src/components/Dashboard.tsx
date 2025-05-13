import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import WorkList from './WorkList';
import GridVisualization from './GridVisualization';
import Settings from './Settings';
import { workProjects as initialWorkProjects, gridSections } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [workProjects, setWorkProjects] = useState(initialWorkProjects);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleUpdateWorkStatus = (id: string, newStatus: string, notes: string) => {
    setWorkProjects(projects =>
      projects.map(project =>
        project.id === id
          ? { ...project, status: newStatus as any }
          : project
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header toggleSidebar={toggleSidebar} onSettingsClick={() => setShowSettings(true)} />
      
      <div className="flex flex-1">
        <Sidebar 
          isOpen={sidebarOpen} 
          closeSidebar={closeSidebar}
          onSettingsClick={() => setShowSettings(true)}
        />
        
        <main className="flex-1 md:ml-64 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Overview of ongoing work and power grid status</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-6">
              <GridVisualization gridSections={gridSections} />
            </div>
            
            <div>
              <WorkList 
                projects={workProjects}
                onUpdateStatus={handleUpdateWorkStatus}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Settings onClose={() => setShowSettings(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;