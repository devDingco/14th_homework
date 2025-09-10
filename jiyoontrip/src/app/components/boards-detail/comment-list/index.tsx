"use client";
import Image from "next/image";
const grayStar = "/images/graystar.webp";
const yellowStar = "/images/yellowstar.webp";
import useCommentList from "./hook";
import styles from "./styles.module.css";

export default function CommentListComponent() {
  const { data } = useCommentList();
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.commentList}>
            {data?.fetchBoardComments?.length === 0 ? (
              <div className={styles.nocomment}>등록된 댓글이 없습니다.</div>
            ) : (
              data?.fetchBoardComments
                .slice()
                .reverse()
                .map((el) => (
                  <div className={styles.commentList__item} key={el._id} id={el._id}>
                    <div className={styles.commentList__item__enroll}>
                      <div className={styles.commentList__item__enroll__left}>
                        <div className={styles.commentList__item__enroll__left__profile}>
                          <Image
                            src="/icons/outline/profile.svg"
                            alt="ProfileIcon"
                            width={24}
                            height={24}
                            sizes="100vw"
                          />{" "}
                          {el.writer}
                        </div>
                        <div className={styles.stars}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                              key={index}
                              src={index + 1 <= el.rating ? yellowStar : grayStar}
                              alt="StarIcon"
                              width={24}
                              height={24}
                              sizes="100vw"
                            />
                          ))}
                        </div>
                      </div>
                      <div className={styles.commentList__item__enroll__right}>
                        <button>
                          <Image
                            src="/icons/outline/edit.svg"
                            alt="EditIcon"
                            width={24}
                            height={24}
                            sizes="100vw"
                          />
                        </button>
                        <button>
                          <Image
                            src="/icons/outline/close.svg"
                            alt="CloseIcon"
                            width={24}
                            height={24}
                            sizes="100vw"
                          />
                        </button>
                      </div>
                    </div>
                    <div className={styles.commentList__item__content}>{el.contents}</div>
                    <div className={styles.commentList__item__date}>
                      {el.createdAt.split("T")[0]}
                    </div>
                    <hr className={styles.line} />
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
