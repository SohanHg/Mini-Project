// Define types for the application

export interface Employee {
  id: string;
  name: string;
  role: string;
  contactNumber: string;
  department: string;
}

export interface WorkProject {
  id: string;
  title: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  startTime: string;
  estimatedEndTime: string;
  assignedEmployees: string[]; // Employee IDs
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface GridSection {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'alert';
  load: number; // Current load percentage
  region: string;
  connectedTo: string[]; // IDs of connected grid sections
}

export interface AuthUser {
  id: string;
  name: string;
  isAuthenticated: boolean;
}