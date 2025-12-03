'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import {
  CREATE_TRAVELPRODUCT_QUESTION,
  FETCH_TRAVELPRODUCT_QUESTIONS,
  FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
  CREATE_TRAVELPRODUCT_QUESTION_ANSWER,
  UPDATE_TRAVELPRODUCT_QUESTION_ANSWER,
  DELETE_TRAVELPRODUCT_QUESTION_ANSWER,
  UPDATE_TRAVELPRODUCT_QUESTION,
  DELETE_TRAVELPRODUCT_QUESTION,
} from '@/components/accommodation-detail/queries';
import {
  MutationCreateTravelproductQuestionArgs,
  MutationCreateTravelproductQuestionAnswerArgs,
  MutationUpdateTravelproductQuestionAnswerArgs,
  MutationDeleteTravelproductQuestionAnswerArgs,
  MutationUpdateTravelproductQuestionArgs,
  MutationDeleteTravelproductQuestionArgs,
} from '@/commons/graphql/graphql';
import styles from './styles.module.css';

// 문의 데이터 타입 정의
interface TravelproductQuestionType {
  _id: string;
  contents: string;
  createdAt: string;
  user?: {
    _id: string;
    name?: string;
    picture?: string;
  };
  travelproductQuestionAnswer?: {
    _id: string;
    contents: string;
    createdAt: string;
    updatedAt: string;
    user?: {
      _id: string;
      name?: string;
      picture?: string;
    };
  } | null;
}

interface FetchTravelproductQuestionsData {
  fetchTravelproductQuestions: TravelproductQuestionType[];
}

interface Reply {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorImage?: string;
  createdAt: string;
  isSeller?: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  authorName: string;
  authorImage?: string;
  createdAt: string;
  reply?: Reply;
}

interface CommentsProps {
  travelproductId: string;
  comments?: Comment[];
  isSeller?: boolean;
}

export default function Comments({
  travelproductId,
  comments = [],
  isSeller = false,
}: CommentsProps) {
  const [comment, setComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editCommentContent, setEditCommentContent] = useState('');
  const [answersMap, setAnswersMap] = useState<
    Record<string, TravelproductQuestionType['travelproductQuestionAnswer']>
  >({});
  const maxLength = 100;
  const client = useApolloClient();

  // 문의 목록 조회
  const { data: questionsData, refetch } = useQuery<FetchTravelproductQuestionsData>(
    FETCH_TRAVELPRODUCT_QUESTIONS,
    {
      variables: {
        travelproductId,
        page: 1,
      },
      skip: !travelproductId,
    }
  );

  // 문의 목록이 변경될 때 각 문의에 대한 답변 조회
  useEffect(() => {
    const questions = questionsData?.fetchTravelproductQuestions || [];

    const fetchAnswers = async () => {
      const questionIds = new Set(questions.map((q) => q._id));

      // 삭제된 문의의 답변을 answersMap에서 제거
      const newAnswersMap: Record<
        string,
        TravelproductQuestionType['travelproductQuestionAnswer']
      > = {};

      // 기존 answersMap에서 현재 문의 목록에 있는 것만 유지
      Object.keys(answersMap).forEach((questionId) => {
        if (questionIds.has(questionId)) {
          newAnswersMap[questionId] = answersMap[questionId];
        }
      });

      // 새로 추가된 문의에 대해서만 답변 조회
      await Promise.all(
        questions.map(async (question) => {
          // 이미 조회한 답변이 있으면 스킵
          if (newAnswersMap[question._id]) {
            return;
          }

          try {
            const { data } = await client.query({
              query: FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
              variables: {
                travelproductQuestionId: question._id,
                page: 1,
              },
            });

            const answers = data?.fetchTravelproductQuestionAnswers || [];
            if (answers.length > 0) {
              newAnswersMap[question._id] = answers[0];
            }
          } catch (error) {
            console.error(`답변 조회 실패 (문의 ID: ${question._id}):`, error);
          }
        })
      );

      setAnswersMap(newAnswersMap);
    };

    if (questions.length === 0) {
      // 문의가 없으면 answersMap 초기화
      setAnswersMap({});
      return;
    }

    fetchAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsData?.fetchTravelproductQuestions]);

  // 문의 등록 mutation
  const [createTravelproductQuestion, { loading: createLoading }] = useMutation<
    any,
    MutationCreateTravelproductQuestionArgs
  >(CREATE_TRAVELPRODUCT_QUESTION, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: {
          travelproductId,
          page: 1,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  // 답변 등록 mutation
  const [createTravelproductQuestionAnswer, { loading: createAnswerLoading }] = useMutation<
    any,
    MutationCreateTravelproductQuestionAnswerArgs
  >(CREATE_TRAVELPRODUCT_QUESTION_ANSWER, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: {
          travelproductId,
          page: 1,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  // 답변 수정 mutation
  const [updateTravelproductQuestionAnswer, { loading: updateAnswerLoading }] = useMutation<
    any,
    MutationUpdateTravelproductQuestionAnswerArgs
  >(UPDATE_TRAVELPRODUCT_QUESTION_ANSWER, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: {
          travelproductId,
          page: 1,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  // 답변 삭제 mutation
  const [deleteTravelproductQuestionAnswer, { loading: deleteAnswerLoading }] = useMutation<
    any,
    MutationDeleteTravelproductQuestionAnswerArgs
  >(DELETE_TRAVELPRODUCT_QUESTION_ANSWER, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: {
          travelproductId,
          page: 1,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  // 문의 수정 mutation
  const [updateTravelproductQuestion, { loading: updateQuestionLoading }] = useMutation<
    any,
    MutationUpdateTravelproductQuestionArgs
  >(UPDATE_TRAVELPRODUCT_QUESTION, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: {
          travelproductId,
          page: 1,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  // 문의 삭제 mutation
  const [deleteTravelproductQuestion, { loading: deleteQuestionLoading }] = useMutation<
    any,
    MutationDeleteTravelproductQuestionArgs
  >(DELETE_TRAVELPRODUCT_QUESTION, {
    refetchQueries: [
      {
        query: FETCH_TRAVELPRODUCT_QUESTIONS,
        variables: {
          travelproductId,
          page: 1,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert('문의 내용을 입력해 주세요.');
      return;
    }

    try {
      await createTravelproductQuestion({
        variables: {
          createTravelproductQuestionInput: {
            contents: comment,
          },
          travelproductId,
        },
      });

      alert('문의가 등록되었습니다.');
      setComment('');
    } catch (error) {
      console.error('문의 등록 실패:', error);
      alert('문의 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleReplyClick = (commentId: string) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent('');
  };

  const handleReplySubmit = async (e: React.FormEvent, questionId: string) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      alert('답변 내용을 입력해 주세요.');
      return;
    }

    try {
      await createTravelproductQuestionAnswer({
        variables: {
          createTravelproductQuestionAnswerInput: {
            contents: replyContent,
          },
          travelproductQuestionId: questionId,
        },
      });

      // 답변 등록 후 해당 문의의 답변을 다시 조회하여 answersMap 업데이트
      try {
        const { data: answerData } = await client.query({
          query: FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
          variables: {
            travelproductQuestionId: questionId,
            page: 1,
          },
        });
        const answers = answerData?.fetchTravelproductQuestionAnswers || [];
        if (answers.length > 0) {
          setAnswersMap((prev) => ({
            ...prev,
            [questionId]: answers[0],
          }));
        }
      } catch (error) {
        console.error('답변 조회 실패:', error);
      }

      alert('답변이 등록되었습니다.');
      setReplyingTo(null);
      setReplyContent('');
    } catch (error) {
      console.error('답변 등록 실패:', error);
      alert('답변 등록에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };

  const handleEditClick = (replyId: string, currentContent: string) => {
    setEditingReplyId(replyId);
    setEditContent(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingReplyId(null);
    setEditContent('');
  };

  const handleEditSubmit = async (e: React.FormEvent, answerId: string) => {
    e.preventDefault();

    if (!editContent.trim()) {
      alert('답변 내용을 입력해 주세요.');
      return;
    }

    try {
      // 답변 ID로 문의 ID 찾기
      const questionId = Object.keys(answersMap).find((key) => answersMap[key]?._id === answerId);

      await updateTravelproductQuestionAnswer({
        variables: {
          travelproductQuestionAnswerId: answerId,
          updateTravelproductQuestionAnswerInput: {
            contents: editContent,
          },
        },
      });

      // 답변 수정 후 해당 문의의 답변을 다시 조회
      if (questionId) {
        try {
          const { data: answerData } = await client.query({
            query: FETCH_TRAVELPRODUCT_QUESTION_ANSWERS,
            variables: {
              travelproductQuestionId: questionId,
              page: 1,
            },
          });
          const answers = answerData?.fetchTravelproductQuestionAnswers || [];
          if (answers.length > 0) {
            setAnswersMap((prev) => ({
              ...prev,
              [questionId]: answers[0],
            }));
          }
        } catch (error) {
          console.error('답변 조회 실패:', error);
        }
      }

      alert('답변이 수정되었습니다.');
      setEditingReplyId(null);
      setEditContent('');
    } catch (error) {
      console.error('답변 수정 실패:', error);
      alert('답변 수정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    if (!confirm('답변을 삭제하시겠습니까?')) {
      return;
    }

    try {
      // 답변 ID로 문의 ID 찾기
      const questionId = Object.keys(answersMap).find((key) => answersMap[key]?._id === answerId);

      await deleteTravelproductQuestionAnswer({
        variables: {
          travelproductQuestionAnswerId: answerId,
        },
      });

      // 답변 삭제 후 answersMap에서 제거
      if (questionId) {
        setAnswersMap((prev) => {
          const newMap = { ...prev };
          delete newMap[questionId];
          return newMap;
        });
      }

      alert('답변이 삭제되었습니다.');
    } catch (error) {
      console.error('답변 삭제 실패:', error);
      alert('답변 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCommentEditClick = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditCommentContent(currentContent);
  };

  const handleCommentCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentContent('');
  };

  const handleCommentEditSubmit = async (e: React.FormEvent, questionId: string) => {
    e.preventDefault();

    if (!editCommentContent.trim()) {
      alert('문의 내용을 입력해 주세요.');
      return;
    }

    try {
      await updateTravelproductQuestion({
        variables: {
          travelproductQuestionId: questionId,
          updateTravelproductQuestionInput: {
            contents: editCommentContent,
          },
        },
      });

      alert('문의가 수정되었습니다.');
      setEditingCommentId(null);
      setEditCommentContent('');
    } catch (error) {
      console.error('문의 수정 실패:', error);
      alert('문의 수정에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm('문의를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteTravelproductQuestion({
        variables: {
          travelproductQuestionId: questionId,
        },
      });

      // 문의 삭제 후 해당 문의의 답변도 answersMap에서 제거
      if (answersMap[questionId]) {
        setAnswersMap((prev) => {
          const newMap = { ...prev };
          delete newMap[questionId];
          return newMap;
        });
      }

      alert('문의가 삭제되었습니다.');
    } catch (error) {
      console.error('문의 삭제 실패:', error);
      alert('문의 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span>문의하기</span>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.textarea}
              placeholder="문의사항을 입력해 주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={maxLength}
              rows={4}
            />
            <div className={styles.count}>
              {comment.length}/{maxLength}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            문의 하기
          </button>
        </div>
      </form>

      <div className={styles.commentsList}>
        {(!questionsData?.fetchTravelproductQuestions ||
          questionsData.fetchTravelproductQuestions.length === 0) &&
        comments.length === 0 ? (
          <p className={styles.emptyMessage}>등록된 문의사항이 없습니다.</p>
        ) : (
          <>
            {/* API에서 가져온 문의 목록 */}
            {questionsData?.fetchTravelproductQuestions?.map(
              (question: TravelproductQuestionType) => (
                <div key={question._id} className={styles.commentWrapper}>
                  <div className={styles.commentItem}>
                    <div className={styles.commentHeader}>
                      <div className={styles.profile}>
                        <div className={styles.profileImage}>
                          {question.user?.picture ? (
                            <Image
                              src={question.user.picture}
                              alt={question.user?.name || '사용자'}
                              fill
                              className={styles.profileImg}
                            />
                          ) : (
                            <div className={styles.profilePlaceholder} />
                          )}
                        </div>
                        <span className={styles.authorName}>{question.user?.name || '익명'}</span>
                      </div>
                      <div className={styles.commentActions}>
                        <button
                          className={styles.editButton}
                          aria-label="수정"
                          onClick={() => handleCommentEditClick(question._id, question.contents)}
                        >
                          <img src="/edit.svg" alt="수정" width={20} height={20} />
                        </button>
                        <button
                          className={styles.deleteButton}
                          aria-label="삭제"
                          onClick={() => handleDeleteQuestion(question._id)}
                        >
                          <img src="/close.svg" alt="삭제" width={20} height={20} />
                        </button>
                      </div>
                    </div>
                    <p className={styles.commentContent}>{question.contents}</p>
                    <div className={styles.commentFooter}>
                      <span className={styles.commentDate}>
                        {new Date(question.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    {isSeller && !answersMap[question._id] && (
                      <button
                        className={styles.replyButton}
                        onClick={() => handleReplyClick(question._id)}
                      >
                        <img src="/reply.svg" alt="답변" width={24} height={24} />
                        <span>답변 하기</span>
                      </button>
                    )}
                  </div>

                  {/* 문의 수정 폼 */}
                  {editingCommentId === question._id && (
                    <div className={styles.commentItem}>
                      <div className={styles.inputContainer}>
                        <textarea
                          className={styles.textarea}
                          placeholder="문의사항을 입력해 주세요."
                          value={editCommentContent}
                          onChange={(e) => setEditCommentContent(e.target.value)}
                          maxLength={maxLength}
                          rows={4}
                          style={{ color: '#333333', fontWeight: 500 }}
                        />
                        <div className={styles.count}>
                          {editCommentContent.length}/{maxLength}
                        </div>
                      </div>
                      <div className={styles.replyButtons} style={{ marginTop: 16 }}>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={handleCommentCancelEdit}
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          className={styles.replySubmitButton}
                          onClick={(e) => handleCommentEditSubmit(e, question._id)}
                        >
                          수정 하기
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 답변 작성 폼 */}
                  {isSeller && replyingTo === question._id && (
                    <div className={styles.replyForm}>
                      <div className={styles.inputContainer}>
                        <textarea
                          className={styles.textarea}
                          placeholder="답변할 내용을 입력해 주세요."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          maxLength={maxLength}
                          rows={4}
                        />
                        <div className={styles.count}>
                          {replyContent.length}/{maxLength}
                        </div>
                      </div>
                      <div className={styles.replyButtons}>
                        <button
                          type="button"
                          className={styles.cancelButton}
                          onClick={handleCancelReply}
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          className={styles.replySubmitButton}
                          onClick={(e) => handleReplySubmit(e, question._id)}
                        >
                          답변 하기
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 답변 표시 */}
                  {answersMap[question._id] && (
                    <>
                      {editingReplyId === answersMap[question._id]!._id ? (
                        /* 답변 수정 폼 */
                        <div className={styles.replyItem}>
                          <div className={styles.replyIcon}>
                            <img src="/return.svg" alt="답변" width={24} height={24} />
                          </div>
                          <div className={styles.replyContent}>
                            <div className={styles.replyForm} style={{ paddingLeft: 0 }}>
                              <div className={styles.inputContainer}>
                                <textarea
                                  className={styles.textarea}
                                  placeholder="답변할 내용을 입력해 주세요."
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  maxLength={maxLength}
                                  rows={4}
                                  style={{ color: '#333333', fontWeight: 500 }}
                                />
                                <div className={styles.count}>
                                  {editContent.length}/{maxLength}
                                </div>
                              </div>
                              <div className={styles.replyButtons}>
                                <button
                                  type="button"
                                  className={styles.cancelButton}
                                  onClick={handleCancelEdit}
                                >
                                  취소
                                </button>
                                <button
                                  type="button"
                                  className={styles.replySubmitButton}
                                  onClick={(e) =>
                                    handleEditSubmit(e, answersMap[question._id]!._id)
                                  }
                                >
                                  수정 하기
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* 답변 내용 */
                        <div className={styles.replyItem}>
                          <div className={styles.replyIcon}>
                            <img src="/return.svg" alt="답변" width={24} height={24} />
                          </div>
                          <div className={styles.replyContent}>
                            <div className={styles.commentHeader}>
                              <div className={styles.profile}>
                                <div className={styles.profileImage}>
                                  {(() => {
                                    const answer = answersMap[question._id];
                                    const userPicture = answer?.user?.picture;
                                    return userPicture ? (
                                      <Image
                                        src={userPicture}
                                        alt={answer.user?.name || '사용자'}
                                        fill
                                        className={styles.profileImg}
                                      />
                                    ) : (
                                      <div className={styles.profilePlaceholder} />
                                    );
                                  })()}
                                </div>
                                <span className={styles.authorName}>
                                  {answersMap[question._id]!.user?.name || '익명'}
                                </span>
                              </div>
                              {isSeller && (
                                <div className={styles.commentActions}>
                                  <button
                                    className={styles.editButton}
                                    aria-label="수정"
                                    onClick={() =>
                                      handleEditClick(
                                        answersMap[question._id]!._id,
                                        answersMap[question._id]!.contents
                                      )
                                    }
                                  >
                                    <img src="/edit.svg" alt="수정" width={20} height={20} />
                                  </button>
                                  <button
                                    className={styles.deleteButton}
                                    aria-label="삭제"
                                    onClick={() =>
                                      handleDeleteAnswer(answersMap[question._id]!._id)
                                    }
                                  >
                                    <img src="/close.svg" alt="삭제" width={20} height={20} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className={styles.commentContent}>
                              {answersMap[question._id]!.contents}
                            </p>
                            <div className={styles.commentFooter}>
                              <span className={styles.commentDate}>
                                {new Date(answersMap[question._id]!.createdAt).toLocaleDateString(
                                  'ko-KR'
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            )}

            {/* 기존 comments prop 데이터 (하위 호환성) */}
            {comments.map((item) => (
              <div key={item.id} className={styles.commentWrapper}>
                {/* 문의 내용 */}
                <div className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <div className={styles.profile}>
                      <div className={styles.profileImage}>
                        {item.authorImage ? (
                          <Image
                            src={item.authorImage}
                            alt={item.authorName}
                            fill
                            className={styles.profileImg}
                          />
                        ) : (
                          <div className={styles.profilePlaceholder} />
                        )}
                      </div>
                      <span className={styles.authorName}>{item.authorName}</span>
                    </div>
                    <div className={styles.commentActions}>
                      <button
                        className={styles.editButton}
                        aria-label="수정"
                        onClick={() => handleCommentEditClick(item.id, item.content)}
                      >
                        <img src="/edit.svg" alt="수정" width={20} height={20} />
                      </button>
                      <button className={styles.deleteButton} aria-label="삭제">
                        <img src="/close.svg" alt="삭제" width={20} height={20} />
                      </button>
                    </div>
                  </div>
                  <p className={styles.commentContent}>{item.content}</p>
                  <div className={styles.commentFooter}>
                    <span className={styles.commentDate}>{item.createdAt}</span>
                  </div>
                  {isSeller && (
                    <button
                      className={styles.replyButton}
                      onClick={() => handleReplyClick(item.id)}
                    >
                      <img src="/reply.svg" alt="답변" width={24} height={24} />
                      <span>답변 하기</span>
                    </button>
                  )}
                </div>

                {/* 문의 수정 폼 */}
                {editingCommentId === item.id && (
                  <div className={styles.commentItem}>
                    <div className={styles.inputContainer}>
                      <textarea
                        className={styles.textarea}
                        placeholder="문의사항을 입력해 주세요."
                        value={editCommentContent}
                        onChange={(e) => setEditCommentContent(e.target.value)}
                        maxLength={maxLength}
                        rows={4}
                        style={{ color: '#333333', fontWeight: 500 }}
                      />
                      <div className={styles.count}>
                        {editCommentContent.length}/{maxLength}
                      </div>
                    </div>
                    <div className={styles.replyButtons} style={{ marginTop: 16 }}>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={handleCommentCancelEdit}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className={styles.replySubmitButton}
                        onClick={(e) => handleCommentEditSubmit(e, item.id)}
                      >
                        수정 하기
                      </button>
                    </div>
                  </div>
                )}

                {/* 답변 작성 폼 */}
                {isSeller && replyingTo === item.id && (
                  <div className={styles.replyForm}>
                    <div className={styles.inputContainer}>
                      <textarea
                        className={styles.textarea}
                        placeholder="답변할 내용을 입력해 주세요."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        maxLength={maxLength}
                        rows={4}
                      />
                      <div className={styles.count}>
                        {replyContent.length}/{maxLength}
                      </div>
                    </div>
                    <div className={styles.replyButtons}>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={handleCancelReply}
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        className={styles.replySubmitButton}
                        onClick={(e) => handleReplySubmit(e, item.id)}
                      >
                        답변 하기
                      </button>
                    </div>
                  </div>
                )}

                {/* 답변 표시 */}
                {item.reply && (
                  <>
                    {editingReplyId === item.reply.id ? (
                      /* 수정 폼 */
                      <div className={styles.replyItem}>
                        <div className={styles.replyIcon}>
                          <img src="/return.svg" alt="답변" width={24} height={24} />
                        </div>
                        <div className={styles.replyContent}>
                          <div className={styles.replyForm} style={{ paddingLeft: 0 }}>
                            <div className={styles.inputContainer}>
                              <textarea
                                className={styles.textarea}
                                placeholder="답변할 내용을 입력해 주세요."
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                maxLength={maxLength}
                                rows={4}
                                style={{ color: '#333333', fontWeight: 500 }}
                              />
                              <div className={styles.count}>
                                {editContent.length}/{maxLength}
                              </div>
                            </div>
                            <div className={styles.replyButtons}>
                              <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancelEdit}
                              >
                                취소
                              </button>
                              <button
                                type="button"
                                className={styles.replySubmitButton}
                                onClick={(e) => handleEditSubmit(e, item.reply!.id)}
                              >
                                수정 하기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* 답변 내용 */
                      <div className={styles.replyItem}>
                        <div className={styles.replyIcon}>
                          <img src="/return.svg" alt="답변" width={24} height={24} />
                        </div>
                        <div className={styles.replyContent}>
                          <div className={styles.commentHeader}>
                            <div className={styles.profile}>
                              <div className={styles.profileImage}>
                                {item.reply.authorImage ? (
                                  <Image
                                    src={item.reply.authorImage}
                                    alt={item.reply.authorName}
                                    fill
                                    className={styles.profileImg}
                                  />
                                ) : (
                                  <div className={styles.profilePlaceholder} />
                                )}
                              </div>
                              <span className={styles.authorName}>{item.reply.authorName}</span>
                            </div>
                            {isSeller && item.reply.isSeller && (
                              <div className={styles.commentActions}>
                                <button
                                  className={styles.editButton}
                                  aria-label="수정"
                                  onClick={() =>
                                    handleEditClick(item.reply!.id, item.reply!.content)
                                  }
                                >
                                  <img src="/edit.svg" alt="수정" width={20} height={20} />
                                </button>
                                <button className={styles.deleteButton} aria-label="삭제">
                                  <img src="/close.svg" alt="삭제" width={20} height={20} />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className={styles.commentContent}>{item.reply.content}</p>
                          <div className={styles.commentFooter}>
                            <span className={styles.commentDate}>{item.reply.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {comments.indexOf(item) < comments.length - 1 && <div className={styles.divider} />}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
