import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const workItemSchema = z.object({
  channel_id: z.string().uuid(),
  author: z.string().min(2).max(50),
  role: z.enum(['dev', 'design', 'qa', 'lead']),
  type: z.enum(['message', 'task', 'handoff', 'bug']),
  title: z.string().max(100).optional(),
  content: z.string().min(1, 'El mensaje no puede estar vacío').max(2000),
  status: z.enum(['todo', 'doing', 'done']).default('todo'),
});