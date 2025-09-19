// queries.ts
import type { CatImage } from './types';

const CAT_API = 'https://api.thecatapi.com/v1/images/search';

export async function fetchCatImages(limit = 20, apiKey?: string): Promise<CatImage[]> {
  const url = new URL(CAT_API);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('mime_types', 'jpg,png');

  // 키가 있으면 헤더에 추가 (레이트리밋/갯수 제한 완화)
  const key =
    apiKey ||
    (import.meta as any)?.env?.VITE_CAT_API_KEY ||
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CAT_API_KEY : undefined);

  const headers: Record<string, string> = {};
  if (key) headers['x-api-key'] = key;

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`Cat API Error: ${res.status}`);

  const data = (await res.json()) as CatImage[];
  return data;
}
