import { Workspace, Channel, WorkItem } from '../types/steeplan';

export const WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: 'App Finanzas MVP', initials: 'AF', color: 'bg-indigo-600' },
  { id: 'ws-2', name: 'Portal E-Learning', initials: 'PE', color: 'bg-emerald-600' },
];

export const CHANNELS: Channel[] = [
  { id: 'ch-1', workspaceId: 'ws-1', name: '01-alcance-y-reglas', category: 'Planificación', description: 'Definición clara de objetivos y criterios de aceptación.' },
  { id: 'ch-2', workspaceId: 'ws-1', name: '02-ui-ux-handoff', category: 'Diseño & UX', description: 'Entrega de pantallas Figma, flujos de usuario y tokens.' },
  { id: 'ch-3', workspaceId: 'ws-1', name: '03-tablero-dev', category: 'Desarrollo', description: 'Tareas técnicas, arquitectura y seguimiento diario.' },
  { id: 'ch-4', workspaceId: 'ws-1', name: '04-qa-y-pruebas', category: 'Calidad & Voz', description: 'Reportes estructurados y sala de pair-programming.' },
];

export const INITIAL_ITEMS: WorkItem[] = [
  {
    id: '1',
    channelId: 'ch-2',
    author: 'Camila (UI/UX)',
    role: 'design',
    type: 'handoff',
    title: 'Flujo de Onboarding y Login v1',
    content: 'Prototipo listo en Figma con estados de error y versión móvil. Listo para pasar a React.',
    status: 'done',
    timestamp: '09:45 AM',
  },
  {
    id: '2',
    channelId: 'ch-3',
    author: 'Alphareone',
    role: 'dev',
    type: 'task',
    title: 'Conectar formulario de Login con validación Zod',
    content: 'Asegurar mensajes de error claros para el usuario y bloquear doble clic al enviar.',
    status: 'doing',
    timestamp: '10:20 AM',
  },
  {
    id: '3',
    channelId: 'ch-4',
    author: 'Mateo (QA)',
    role: 'qa',
    type: 'bug',
    title: 'Botón de envío desalineado en pantallas < 360px',
    content: 'Pasos: Abrir /login en móvil -> Reducir ancho -> El botón desborda el contenedor.',
    status: 'todo',
    timestamp: '11:05 AM',
  },
];
