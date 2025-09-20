import supabase from '@/utils/supabase';
import { TPost } from './types';

export const getPosts = async (page: number, limit: number) => {
  const from = page * limit;
  const to = from + limit - 1;

  const { data: postDatas, error } = await supabase
    .from('Post')
    .select('*')
    .range(from, to)
    .order('id', { ascending: true });

  console.log(postDatas);

  if (error) {
    console.log(error);
    return [];
  }

  return postDatas as TPost[];
};

export const deletePost = async (id: string) => {
  const { error } = await supabase.from('Post').delete().eq('id', id);
  console.log(error);
};

export const updatePost = async (id: string, updatedPost: Partial<TPost>) => {
  const { data, error } = await supabase
    .from('Post')
    .update(updatedPost)
    .eq('id', id)
    .select();

  console.log(data, error);
};

export const createPost = async (post: TPost) => {
  const { data, error } = await supabase.from('Post').insert(post).select();

  console.log(data, error);
};
