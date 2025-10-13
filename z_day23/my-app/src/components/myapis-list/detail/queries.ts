import { supabase } from "@/commons/libraries/supabase";

export const fetchBoardById = async (boardId: string) => {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .eq("id", boardId)
    .single();

  return { data, error };
};
