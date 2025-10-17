'use client';

import { useLoginCheck } from '@/commons/hooks/use-login-check';
import BoardsWriteAdvanced from '@/components/boards-write';
// import { useRouter } from 'next/navigation';
// import { useEffect, useRef } from 'react';

const BoardNewPage = () =>{
  return <BoardsWriteAdvanced isEdit={false} />;
}

export default useLoginCheck(BoardNewPage);