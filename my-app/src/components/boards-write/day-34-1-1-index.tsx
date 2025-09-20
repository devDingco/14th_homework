// src/app/myapis/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
interface MyApi {
  id: string;
  title: string;
  content: string;
  writer: string;
  created_at: string;
  updated_at: string;
}

interface MyApiForm {
  title: string;
  content: string;
  writer: string;
}

// API 함수들
const fetchMyApis = async (
  page: number = 1,
  limit: number = 10
): Promise<{ myApis: MyApi[]; hasMore: boolean }> => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("my_apis")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  const { data: nextData } = await supabase
    .from("my_apis")
    .select("id")
    .range(to + 1, to + 2);

  return {
    myApis: data || [],
    hasMore: (nextData?.length || 0) > 0,
  };
};

const createMyApi = async (form: MyApiForm): Promise<MyApi> => {
  const { data, error } = await supabase
    .from("my_apis")
    .insert([form])
    .select()
    .single();

  if (error) throw error;
  return data;
};

const updateMyApi = async (id: string, form: MyApiForm): Promise<MyApi> => {
  const { data, error } = await supabase
    .from("my_apis")
    .update(form)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const deleteMyApi = async (id: string): Promise<void> => {
  const { error } = await supabase.from("my_apis").delete().eq("id", id);

  if (error) throw error;
};

const fetchMyApiById = async (id: string): Promise<MyApi> => {
  const { data, error } = await supabase
    .from("my_apis")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

// 메인 컴포넌트 - 목록 페이지
export default function MyApisPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <MyApisList />
      </div>
    </div>
  );
}

// 목록 컴포넌트
const MyApisList = () => {
  const [myApis, setMyApis] = useState<MyApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const router = useRouter();

  const loadMyApis = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { myApis: newMyApis, hasMore: newHasMore } = await fetchMyApis(
        page
      );
      setMyApis((prev) => [...prev, ...newMyApis]);
      setHasMore(newHasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching my APIs:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteMyApi(id);
      setMyApis((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting my API:", error);
    }
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMyApis();
    }
  }, [inView, hasMore, loading, loadMyApis]);

  useEffect(() => {
    loadMyApis();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">나만의 컨텐츠 목록</h1>
        <Link
          href="/myapis/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          새 글 작성
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {myApis.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow border"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {item.content.slice(0, 100)}...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">by {item.writer}</span>
              <span className="text-xs text-gray-400">
                {new Date(item.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => router.push(`/myapis/${item.id}`)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
              >
                보기
              </button>
              <button
                onClick={() => router.push(`/myapis/${item.id}/edit`)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          로딩 중...
        </div>
      )}

      {hasMore && (
        <div ref={ref} className="text-center py-4 text-gray-500">
          더 불러오는 중...
        </div>
      )}

      {!hasMore && myApis.length > 0 && (
        <div className="text-center py-4 text-gray-400 border-t mt-4">
          모든 컨텐츠를 불러왔습니다!
        </div>
      )}

      {myApis.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-lg">아직 작성된 컨텐츠가 없습니다.</p>
          <p className="text-sm">첫 번째 컨텐츠를 작성해보세요!</p>
        </div>
      )}
    </div>
  );
};

// 등록/수정 페이지
export function MyApisNewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <MyApisWrite />
      </div>
    </div>
  );
}

export function MyApisEditPage({ params }: { params: { myapiId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <MyApisWrite isEdit={true} myapiId={params.myapiId} />
      </div>
    </div>
  );
}

// 등록/수정 컴포넌트
const MyApisWrite = ({
  isEdit = false,
  myapiId,
}: {
  isEdit?: boolean;
  myapiId?: string;
}) => {
  const router = useRouter();
  const [form, setForm] = useState<MyApiForm>({
    title: "",
    content: "",
    writer: "",
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && myapiId) {
      loadMyApi();
    }
  }, [isEdit, myapiId]);

  const loadMyApi = async () => {
    try {
      const data = await fetchMyApiById(myapiId!);
      setForm({
        title: data.title,
        content: data.content,
        writer: data.writer,
      });
    } catch (error) {
      console.error("Error loading my API:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && myapiId) {
        await updateMyApi(myapiId, form);
      } else {
        await createMyApi(form);
      }
      router.push("/myapis");
      router.refresh();
    } catch (error) {
      console.error("Error saving my API:", error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEdit ? "컨텐츠 수정" : "컨텐츠 작성"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            작성자 *
          </label>
          <input
            type="text"
            name="writer"
            value={form.writer}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목 *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="제목을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용 *
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleInputChange}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "저장 중..." : isEdit ? "수정하기" : "등록하기"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/myapis")}
            className="px-6 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

// 상세 페이지
export function MyApisDetailPage({ params }: { params: { myapiId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <MyApisDetail myapiId={params.myapiId} />
      </div>
    </div>
  );
}

// 상세 컴포넌트
const MyApisDetail = ({ myapiId }: { myapiId: string }) => {
  const router = useRouter();
  const [myApi, setMyApi] = useState<MyApi | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadMyApi();
  }, [myapiId]);

  const loadMyApi = async () => {
    setLoading(true);
    try {
      const data = await fetchMyApiById(myapiId);
      setMyApi(data);
    } catch (error) {
      console.error("Error loading my API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    setDeleteLoading(true);
    try {
      await deleteMyApi(myapiId);
      router.push("/myapis");
      router.refresh();
    } catch (error) {
      console.error("Error deleting my API:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!myApi) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8 text-gray-500">
          컨텐츠를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{myApi.title}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/myapis/${myapiId}/edit`)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50 transition-colors"
          >
            {deleteLoading ? "삭제 중..." : "삭제"}
          </button>
          <button
            onClick={() => router.push("/myapis")}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
          >
            목록
          </button>
        </div>
      </div>

      <div className="mb-6 pb-4 border-b">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>작성자: {myApi.writer}</span>
          <span>•</span>
          <span>작성일: {new Date(myApi.created_at).toLocaleDateString()}</span>
          {myApi.updated_at !== myApi.created_at && (
            <>
              <span>•</span>
              <span>
                수정일: {new Date(myApi.updated_at).toLocaleDateString()}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {myApi.content}
        </div>
      </div>
    </div>
  );
};
