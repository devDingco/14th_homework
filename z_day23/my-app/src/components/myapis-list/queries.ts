import { supabase } from "@/commons/libraries/supabase";

export const fetchBoardsFromDB = async (
  itemsPerPage: number,
  pageNum: number
) => {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .order("created_at", { ascending: false })
    .range(pageNum * itemsPerPage, (pageNum + 1) * itemsPerPage - 1);

  return { data, error };
};

export const deleteBoardFromDB = async (id: string) => {
  const { error } = await supabase.from("board").delete().eq("id", id);
  return { error };
};
