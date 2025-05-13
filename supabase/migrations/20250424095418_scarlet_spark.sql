/*
  # Initial Schema Setup for KESB

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `contact_number` (text)
      - `department` (text)
      - `created_at` (timestamp)

    - `work_projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `location` (text)
      - `status` (text)
      - `start_time` (timestamp)
      - `estimated_end_time` (timestamp)
      - `description` (text)
      - `priority` (text)
      - `created_at` (timestamp)

    - `project_assignments`
      - `id` (uuid, primary key)
      - `project_id` (uuid, references work_projects)
      - `employee_id` (uuid, references employees)
      - `created_at` (timestamp)

    - `grid_sections`
      - `id` (uuid, primary key)
      - `name` (text)
      - `status` (text)
      - `load` (integer)
      - `region` (text)
      - `created_at` (timestamp)

    - `grid_connections`
      - `id` (uuid, primary key)
      - `from_section_id` (uuid, references grid_sections)
      - `to_section_id` (uuid, references grid_sections)
      - `created_at` (timestamp)

    - `incidents`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `severity` (text)
      - `status` (text)
      - `reported_by` (uuid, references employees)
      - `created_at` (timestamp)

    - `schedules`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, references employees)
      - `shift_start` (timestamp)
      - `shift_end` (timestamp)
      - `type` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Employees table
CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  contact_number text,
  department text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees are viewable by authenticated users"
  ON employees
  FOR SELECT
  TO authenticated
  USING (true);

-- Work Projects table
CREATE TABLE work_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  status text NOT NULL,
  start_time timestamptz NOT NULL,
  estimated_end_time timestamptz NOT NULL,
  description text,
  priority text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE work_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Work projects are viewable by authenticated users"
  ON work_projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Work projects are insertable by authenticated users"
  ON work_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Work projects are updatable by authenticated users"
  ON work_projects
  FOR UPDATE
  TO authenticated
  USING (true);

-- Project Assignments table
CREATE TABLE project_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES work_projects ON DELETE CASCADE,
  employee_id uuid REFERENCES employees ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project assignments are viewable by authenticated users"
  ON project_assignments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Project assignments are insertable by authenticated users"
  ON project_assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Grid Sections table
CREATE TABLE grid_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL,
  load integer NOT NULL,
  region text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grid_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Grid sections are viewable by authenticated users"
  ON grid_sections
  FOR SELECT
  TO authenticated
  USING (true);

-- Grid Connections table
CREATE TABLE grid_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_section_id uuid REFERENCES grid_sections ON DELETE CASCADE,
  to_section_id uuid REFERENCES grid_sections ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grid_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Grid connections are viewable by authenticated users"
  ON grid_connections
  FOR SELECT
  TO authenticated
  USING (true);

-- Incidents table
CREATE TABLE incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  severity text NOT NULL,
  status text NOT NULL,
  reported_by uuid REFERENCES employees ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Incidents are viewable by authenticated users"
  ON incidents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Incidents are insertable by authenticated users"
  ON incidents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Incidents are updatable by authenticated users"
  ON incidents
  FOR UPDATE
  TO authenticated
  USING (true);

-- Schedules table
CREATE TABLE schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees ON DELETE CASCADE,
  shift_start timestamptz NOT NULL,
  shift_end timestamptz NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Schedules are viewable by authenticated users"
  ON schedules
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Schedules are insertable by authenticated users"
  ON schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Schedules are updatable by authenticated users"
  ON schedules
  FOR UPDATE
  TO authenticated
  USING (true);