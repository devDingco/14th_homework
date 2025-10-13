import { supabase } from "@/commons/libraries/supabase";
import { IBoardData } from "./types";

export const fetchBoardById = async (boardId: string) => {
  const { data, error } = await supabase
    .from("board")
    .select("*")
    .eq("id", boardId)
    .single();
  return { data, error };
};

export const createBoard = async (boardData: IBoardData) => {
  const { error } = await supabase.from("board").insert([boardData]);
  return { error };
};

export const updateBoard = async (boardId: string, boardData: IBoardData) => {
  const { error } = await supabase
    .from("board")
    .update({
      title: boardData.title,
      content: boardData.content,
    })
    .eq("id", boardId);
  return { error };
};
