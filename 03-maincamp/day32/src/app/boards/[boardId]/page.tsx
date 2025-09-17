"use client"

// import Image from 'next/image';
// import styles from './styles.module.css';
// import {useRouter, useParams } from 'next/navigation';
// import {gql, useQuery, useMutation} from '@apollo/client';
import BoardsDetail from '@/components/boards-detail';
import CommentList from '@/components/boards-detail/comment-list';
import CommentWrite from '@/components/boards-detail/comment-write';



export default function BoardsDetailPage() {

  return (
    <>
    <BoardsDetail/>
    <CommentWrite/>
    <CommentList/>
    
    </>
  )
   
}