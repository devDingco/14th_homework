// 기존 댓글 컴포넌트 (별점 포함)
export { default as CommentSection } from './commentSection';
export { default as CommentComposer } from './commentComposer';
export { default as CommentItem } from './commentItem';

// 문의하기 댓글 컴포넌트 (대댓글 기능 포함)
export { default as InquirySection } from './inquirySection';
export { default as InquiryComposer } from './inquiryComposer';
export { default as InquiryItem } from './inquiryItem';

// 타입 export
export type { AppComment, NewComment } from '@/types/comment';
export type { InquiryComment, InquiryReply, NewInquiryComment, NewInquiryReply } from '@/types/comment';
