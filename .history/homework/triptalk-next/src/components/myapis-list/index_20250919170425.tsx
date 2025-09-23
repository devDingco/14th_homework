'use client';
import { supabase } from '@/commons/libraries/supabase';


export default function MyApisList() {
  const result = await supabase.from