import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Employee, WorkProject, GridSection, Incident, Schedule } from '../types';

interface Store {
  employees: Employee[];
  workProjects: WorkProject[];
  gridSections: GridSection[];
  incidents: Incident[];
  schedules: Schedule[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  fetchWorkProjects: () => Promise<void>;
  fetchGridSections: () => Promise<void>;
  fetchIncidents: () => Promise<void>;
  fetchSchedules: () => Promise<void>;
  updateWorkStatus: (id: string, status: string, notes: string) => Promise<void>;
  addNewWork: (work: Omit<WorkProject, 'id'>) => Promise<void>;
  addIncident: (incident: Omit<Incident, 'id' | 'created_at'>) => Promise<void>;
  updateSchedule: (schedule: Schedule) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  employees: [],
  workProjects: [],
  gridSections: [],
  incidents: [],
  schedules: [],
  loading: false,
  error: null,

  fetchEmployees: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('employees')
        .select('*');
      
      if (error) throw error;
      set({ employees: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchWorkProjects: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('work_projects')
        .select(`
          *,
          project_assignments (
            employee_id
          )
        `);
      
      if (error) throw error;
      set({ workProjects: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchGridSections: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('grid_sections')
        .select(`
          *,
          grid_connections!from_section_id (
            to_section_id
          )
        `);
      
      if (error) throw error;
      set({ gridSections: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchIncidents: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('incidents')
        .select('*');
      
      if (error) throw error;
      set({ incidents: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSchedules: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('schedules')
        .select('*');
      
      if (error) throw error;
      set({ schedules: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateWorkStatus: async (id: string, status: string, notes: string) => {
    try {
      set({ loading: true });
      const { error } = await supabase
        .from('work_projects')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      get().fetchWorkProjects();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addNewWork: async (work) => {
    try {
      set({ loading: true });
      const { error } = await supabase
        .from('work_projects')
        .insert([work]);
      
      if (error) throw error;
      
      get().fetchWorkProjects();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addIncident: async (incident) => {
    try {
      set({ loading: true });
      const { error } = await supabase
        .from('incidents')
        .insert([incident]);
      
      if (error) throw error;
      
      get().fetchIncidents();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateSchedule: async (schedule) => {
    try {
      set({ loading: true });
      const { error } = await supabase
        .from('schedules')
        .upsert([schedule]);
      
      if (error) throw error;
      
      get().fetchSchedules();
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));