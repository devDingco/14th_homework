"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import BoardsListPage from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import { FECTH_BOARDS_COUNT, FETCH_BOARDS } from "./queries";
import { DatePicker, Space } from "antd";
import SearchBar from "@/components/boards-list/search";
import { useState } from "react";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;
// import Banner from "@/components/boards-list/banner";

export default function BoardsPage() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { data, refetch } = useQuery(FETCH_BOARDS, {
    variables: {
      search: "",
      page: 1,
      endDate: undefined,
      startDate: undefined,
    },
  });
  refetch();
  const { data: dataBoardsCount } = useQuery(FECTH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const onClickMoveNew = () => {
    router.push("/boards/new");
  };

  const onChangeDate = (dates) => {
    if (dates) {
      const [start, end] = dates;

      refetch({
        endDate: end.toISOString(),
        startDate: start.toISOString(),
        page: 1,
      });
    } else {
      // 선택 해제 시 모든 게시물 조회
      refetch({
        startDate: undefined,
        endDate: undefined,
        page: 1,
      });
    }
  };
  return (
    <div className="w-full max-w-7xl">
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
              refetch={refetch}
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
      <BoardsListPage data={data?.fetchBoards} keyword={keyword} />
      <Pagination lastPage={lastPage} refetch={refetch} />
    </div>
  );
}
