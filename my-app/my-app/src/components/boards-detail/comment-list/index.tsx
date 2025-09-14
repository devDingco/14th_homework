"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import profileIcon from "./icon/img.svg";
import editIcon from "./icon/edit.svg";
import closeIcon from "./icon/close.svg";

const IMAGE_SRC = {
  profileIcon: {
    src: profileIcon,
    alt: "프로필이미지",
  },
  editIcon: {
    src: editIcon,
    alt: "편집버튼",
  },
  closeIcon: {
    src: closeIcon,
    alt: "삭제버튼",
  },
};

const FETCH_BOARD_COMMENTS = gql`
  query FetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function CommentList() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: String(params.boardId) },
  });

  return (
    <>
      {data?.fetchBoardComments?.map((el: any) => {
        return (
          <div key={el._id}>
            {/* ->  key: React가 리스트 렌더링 시 각 항목을 구분하고 효율적으로 업데이트하기 위해 필수적으로 주는 값 */}
            <div className={styles.commentContainer}>
              <div className={styles.commentBody}>
                <div className={styles.commentFrame}>
                  <div className={styles.header}>
                    <div className={styles.header_Profile}>
                      <Image
                        src={IMAGE_SRC.profileIcon.src}
                        alt={IMAGE_SRC.profileIcon.alt}
                      />
                      <div className={styles.header_Profile_writer}>
                        {el.writer}
                      </div>
                      <div className={styles.header_Rating}>{el.rating}</div>
                    </div>
                    <div className={styles.header_Edit_Close}>
                      <Image
                        src={IMAGE_SRC.editIcon.src}
                        alt={IMAGE_SRC.editIcon.alt}
                      />
                      <Image
                        src={IMAGE_SRC.closeIcon.src}
                        alt={IMAGE_SRC.closeIcon.alt}
                      />
                    </div>
                  </div>
                  <div className={styles.commentContents}>{el.contents}</div>
                  <div className={styles.commentDate}>
                    {el.createdAt.split("T")[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
