import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Emotion } from "@/commons/constants/enum";

type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

type Retrospect = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

export const useDiaryDetail = () => {
  const [diary, setDiary] = useState<Diary | null>(null);
  const [retrospects, setRetrospects] = useState<Retrospect[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const loadData = () => {
      // URL에서 ID 추출
      const segments = pathname.split("/");
      const id = segments[segments.length - 1];
      const diaryId = parseInt(id, 10);

      if (isNaN(diaryId)) {
        return;
      }

      // 로컬스토리지에서 diaries 데이터 가져오기
      const diariesData = localStorage.getItem("diaries");
      if (diariesData) {
        try {
          const diaries: Diary[] = JSON.parse(diariesData);
          const foundDiary = diaries.find((d) => d.id === diaryId);
          setDiary(foundDiary || null);
        } catch (error) {
          console.error("Failed to parse diaries data:", error);
        }
      }

      // 로컬스토리지에서 retrospects 데이터 가져오기
      const retrospectsData = localStorage.getItem("retrospects");
      if (retrospectsData) {
        try {
          const allRetrospects: Retrospect[] = JSON.parse(retrospectsData);
          // 현재 일기의 회고만 필터링
          const filteredRetrospects = allRetrospects.filter((r) => r.diaryId === diaryId);
          setRetrospects(filteredRetrospects);
        } catch (error) {
          console.error("Failed to parse retrospects data:", error);
        }
      } else {
        setRetrospects([]);
      }
    };

    // 초기 데이터 로드
    loadData();

    // 커스텀 이벤트 리스너 (회고 추가/변경 시 다시 로드)
    const handleRetrospectChange = () => {
      loadData();
    };

    // 커스텀 이벤트 리스너 (일기 수정 시 다시 로드)
    const handleDiaryUpdate = () => {
      loadData();
    };

    window.addEventListener("retrospects-change", handleRetrospectChange);
    window.addEventListener("diary-updated", handleDiaryUpdate);

    return () => {
      window.removeEventListener("retrospects-change", handleRetrospectChange);
      window.removeEventListener("diary-updated", handleDiaryUpdate);
    };
  }, [pathname]);

  return { diary, retrospects };
};

