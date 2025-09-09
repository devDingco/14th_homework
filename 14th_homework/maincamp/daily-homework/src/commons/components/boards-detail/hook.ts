'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import dayjs from 'dayjs';
import { FETCH_BOARD } from './queries';
import { D_Variables } from './types';

export default function useDetail() {
  const url = useParams();
  const router = useRouter();

  const d_variables: D_Variables = {
    isEdit: true,
    ID: String(url._ID),
  };

  // console.log(myUrl.boardId);
  const { data } = useQuery(FETCH_BOARD, { variables: d_variables });

  const dt = data?.fetchBoard.createdAt;
  const koreaTime = dayjs(dt).format('YYYY-MM-DD HH:mm:ss');

  return {
    url,
    router,
    d_variables,
    data,
    dt,
    koreaTime,
  };
}
