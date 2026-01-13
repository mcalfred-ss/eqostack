-- ============================================
-- Projects/Apps Table
-- ============================================
-- This table stores the projects/apps that are displayed on the Products page

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT, -- URL to project image
  variants TEXT[], -- Array of variant options (e.g., ['iOS', 'Android', 'Web'])
  download_url TEXT, -- Download link for the project
  order_index INTEGER DEFAULT 0, -- For custom ordering
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published, order_index);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published projects
CREATE POLICY "Anyone can view published projects" ON projects
  FOR SELECT USING (published = true);

-- Policy: Only admins can manage projects
CREATE POLICY "Admins can manage projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
