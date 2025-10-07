import { supabase } from '@/commons/libraries/supabase';
import { Inputs } from './types';

export default function fetchList(): Promise<Inputs[]> {
  const { data, error } = await supabase
    .from('board')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function deleteList(id: string): Promise<void> {
  const { error } = await supabase.from('board').delete().eq('id', id);
  if (error) throw error;
}
