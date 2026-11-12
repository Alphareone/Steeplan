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
  workspaceId: string;
  name: string;
  category: 'Planificación' | 'Diseño & UX' | 'Desarrollo' | 'Calidad & Voz';
  description: string;
}

export interface WorkItem {
  id: string;
  channelId: string;
  author: string;
  role: SpecialtyRole;
  type: 'message' | 'task' | 'handoff' | 'bug';
  title?: string;
  content: string;
  status: 'todo' | 'doing' | 'done';
  timestamp: string;
}
