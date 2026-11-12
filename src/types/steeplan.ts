export type SpecialtyRole = 'dev' | 'design' | 'qa' | 'lead';
export type ViewMode = 'chat' | 'kanban' | 'voice';

export interface Workspace {
  id: string;
  name: string;
  initials: string;
  color: string;
}

export interface Channel {
  id: string;
  workspace_id: string;
  name: string;
  category: 'Planificación' | 'Diseño & UX' | 'Desarrollo' | 'Calidad & Voz';
  description: string;
}

export interface WorkItem {
  id: string;
  channel_id: string;
  author: string;
  role: SpecialtyRole;
  type: 'message' | 'task' | 'handoff' | 'bug';
  title?: string | null;
  content: string;
  status: 'todo' | 'doing' | 'done';
  created_at: string;
}