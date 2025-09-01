import { allTransactionData } from '@/commons/mypage/tables/mock';
import TransactionTable, { TransactionData } from '@/commons/mypage/tables/transaction/TransactionTable';
import React from 'react';

export default function AllTransactionsPage() {
  const transactionData = allTransactionData as TransactionData[];
  return (
    <div>
      <TransactionTable data={transactionData} />
    </div>
  );
}
