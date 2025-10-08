'use client';

import { supabase } from '@/commons/libraries/supabase';
import { useRouter } from 'next/router';
import useDataList from './hook';
import { useEffect } from 'react';
import styles from './styles.module.css';
import { WebAssetOffTwoTone } from '@mui/icons-material';

export default function ApisListPage() {
  const { title,
     loading,
      onDelete
   } = useDataList();

  return (
    <div className={styles.layout}>
        <h1>컨텐츠 목록</h1>
      <div className={styles.title}></div>
    </div>
  );
}



