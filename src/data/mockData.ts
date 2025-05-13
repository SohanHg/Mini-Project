// Mock data for development purposes
import { Employee, WorkProject, GridSection } from '../types';

export const employees: Employee[] = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    role: "Senior Electrical Engineer",
    contactNumber: "9876543210",
    department: "Maintenance"
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    role: "Safety Inspector",
    contactNumber: "9876543211",
    department: "Safety"
  },
  {
    id: "EMP003",
    name: "Suresh Gowda",
    role: "Line Technician",
    contactNumber: "9876543212",
    department: "Field Operations"
  },
  {
    id: "EMP004",
    name: "Divya Patil",
    role: "Electrical Supervisor",
    contactNumber: "9876543213",
    department: "Maintenance"
  },
  {
    id: "EMP005",
    name: "Karthik Rao",
    role: "Grid Operator",
    contactNumber: "9876543214",
    department: "Operations"
  }
];

export const workProjects: WorkProject[] = [
  {
    id: "WRK001",
    title: "Transformer Maintenance - Jayanagar",
    location: "Jayanagar 4th Block",
    status: "in-progress",
    startTime: "2025-01-15T08:30:00",
    estimatedEndTime: "2025-01-15T14:30:00",
    assignedEmployees: ["EMP001", "EMP003"],
    description: "Routine maintenance and inspection of distribution transformers",
    priority: "medium"
  },
  {
    id: "WRK002",
    title: "Power Line Repair - Malleshwaram",
    location: "Malleshwaram 18th Cross",
    status: "pending",
    startTime: "2025-01-16T09:00:00",
    estimatedEndTime: "2025-01-16T17:00:00",
    assignedEmployees: ["EMP003", "EMP004"],
    description: "Repair damaged power lines due to fallen tree",
    priority: "high"
  },
  {
    id: "WRK003",
    title: "Substation Inspection - Electronic City",
    location: "Electronic City Phase 1",
    status: "completed",
    startTime: "2025-01-14T10:00:00",
    estimatedEndTime: "2025-01-14T15:00:00",
    assignedEmployees: ["EMP002", "EMP005"],
    description: "Safety inspection of substation equipment",
    priority: "medium"
  },
  {
    id: "WRK004",
    title: "Emergency Repair - Koramangala",
    location: "Koramangala 5th Block",
    status: "in-progress",
    startTime: "2025-01-15T07:00:00",
    estimatedEndTime: "2025-01-15T12:00:00",
    assignedEmployees: ["EMP001", "EMP004", "EMP003"],
    description: "Emergency repair of damaged transformer due to heavy rainfall",
    priority: "critical"
  },
  {
    id: "WRK005",
    title: "Grid Upgrade - MG Road",
    location: "MG Road Metro Station Area",
    status: "delayed",
    startTime: "2025-01-13T08:00:00",
    estimatedEndTime: "2025-01-14T17:00:00",
    assignedEmployees: ["EMP005", "EMP001"],
    description: "Upgrading power grid capacity to handle increased load",
    priority: "high"
  }
];

export const gridSections: GridSection[] = [
  {
    id: "GRID001",
    name: "North Bangalore Substation",
    status: "online",
    load: 78,
    region: "North Bangalore",
    connectedTo: ["GRID002", "GRID005"]
  },
  {
    id: "GRID002",
    name: "Central Distribution Hub",
    status: "online",
    load: 85,
    region: "Central Bangalore",
    connectedTo: ["GRID001", "GRID003", "GRID004"]
  },
  {
    id: "GRID003",
    name: "South Zone Power Station",
    status: "maintenance",
    load: 45,
    region: "South Bangalore",
    connectedTo: ["GRID002", "GRID005"]
  },
  {
    id: "GRID004",
    name: "East Bangalore Grid",
    status: "alert",
    load: 92,
    region: "East Bangalore",
    connectedTo: ["GRID002"]
  },
  {
    id: "GRID005",
    name: "West Zone Distribution",
    status: "online",
    load: 67,
    region: "West Bangalore",
    connectedTo: ["GRID001", "GRID003"]
  },
  {
    id: "GRID006",
    name: "Industrial Area Substation",
    status: "offline",
    load: 0,
    region: "Southeast Bangalore",
    connectedTo: []
  }
];

// Function to simulate authentication - in a real app this would be a server call
export const authenticateUser = (userName: string, userId: string): Promise<Employee | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundEmployee = employees.find(
        emp => emp.name.toLowerCase() === userName.toLowerCase() && emp.id === userId
      );
      resolve(foundEmployee || null);
    }, 800); // Simulate network delay
  });
};