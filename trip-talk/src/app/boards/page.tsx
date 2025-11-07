"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import BoardsListPage from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS_COUNT, FETCH_BOARDS } from "./queries";
import { DatePicker, Space } from "antd";
import SearchBar from "@/components/boards-list/search";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;
// import Banner from "@/components/boards-list/banner";

export default function BoardsPage() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  // 쿼리 변수를 상태로 관리
  const [queryVariables, setQueryVariables] = useState<{
    search: string;
    page: number;
    endDate?: string;
    startDate?: string;
  }>({
    search: "",
    page: 1,
    endDate: undefined,
    startDate: undefined,
  });

  const { data } = useQuery(FETCH_BOARDS, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network", // ✅ 캐시 사용하면서도 서버 데이터도 가져옴
  });

  const {
    data: dataBoardsCount,
    loading: countLoading,
    error: countError,
  } = useQuery(FETCH_BOARDS_COUNT);

  // 디버깅: 서버에서 받은 게시글 수 확인
  console.log("=== 게시글 수 정보 ===");
  console.log("전체 게시글 수:", dataBoardsCount?.fetchBoardsCount);
  console.log("로딩 중:", countLoading);
  console.log("에러:", countError);
  console.log("현재 표시된 게시글 수:", data?.fetchBoards?.length);

  const totalBoards = dataBoardsCount?.fetchBoardsCount ?? 0;
  const lastPage = Math.ceil(totalBoards / 10);

  console.log("총 게시글 수:", totalBoards);
  console.log("마지막 페이지:", lastPage);

  const onClickMoveNew = () => {
    router.push("/boards/new");
  };

  const onChangeDate = (
    dates:
      | null
      | (
          | [
              { toISOString: () => string } | null,
              { toISOString: () => string } | null
            ]
          | null
        )
  ) => {
    if (dates && dates[0] && dates[1]) {
      const [startDate, endDate] = dates;
      // refetch 대신 variables 업데이트
      setQueryVariables((prev) => ({
        ...prev,
        endDate: endDate.toISOString(),
        startDate: startDate.toISOString(),
        page: 1,
      }));
    } else {
      // 선택 해제 시 모든 게시물 조회
      setQueryVariables((prev) => ({
        ...prev,
        startDate: undefined,
        endDate: undefined,
        page: 1,
      }));
    }
  };
  return (
    <div className="w-full max-w-7xl">
      <div className={styles.title}>트립토크 게시판</div>
      <div className={styles.top_of_list}>
        <div className={styles.date_and_search}>
          <div>
            <Space direction="vertical" size={12}>
              <RangePicker
                id={{
                  start: "startInput",
                  end: "endInput",
                }}
                className={styles.datePicker}
                onFocus={(_, info) => {
                  console.log("Focus:", info.range);
                }}
                onBlur={(_, info) => {
                  console.log("Blur:", info.range);
                }}
                onChange={onChangeDate}
              />
            </Space>
          </div>
          <div>
            <SearchBar
              data={data?.fetchBoards}
              setQueryVariables={setQueryVariables}
              setKeyword={setKeyword}
            />
          </div>
        </div>
        <div>
          <Image
            src={"/images/button.png"}
            alt="트립토크등록"
            width={162}
            height={48}
            onClick={onClickMoveNew}
          />
        </div>
      </div>
      <div className={styles.boards}>
        <BoardsListPage
          data={data?.fetchBoards}
          keyword={keyword}
          queryVariables={queryVariables}
        />
        <Pagination
          lastPage={lastPage}
          setQueryVariables={setQueryVariables}
          currentPage={queryVariables.page}
        />
      </div>
    </div>
  );
}
