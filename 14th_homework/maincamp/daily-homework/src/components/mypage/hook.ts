'use client';

import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { FetchUserLoggedInDocument, FetchUserLoggedInQuery } from '@/commons/graphql/graphql';

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
        createdAt
        updatedAt
      }
    }
  }
`;

const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
  query fetchPointTransactionsOfLoading($page: Int, $search: String) {
    fetchPointTransactionsOfLoading(page: $page, search: $search) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
      updatedAt
    }
  }
`;

export default function usePasswordChange() {
  // 비밀번호 변경 관련 state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 현재 로그인된 사용자 정보 가져오기
  const { data: userData } = useQuery<FetchUserLoggedInQuery>(FetchUserLoggedInDocument);
  const userEmail = userData?.fetchUserLoggedIn?.email;

  const [resetUserPassword] = useMutation(RESET_USER_PASSWORD);
  const [loginUser] = useMutation(LOGIN_USER);

  const onChangeCurrentPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
    if (passwordError) setPasswordError('');
    if (successMessage) setSuccessMessage('');
  };

  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    if (passwordError) setPasswordError('');
    if (successMessage) setSuccessMessage('');
  };

  const onChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    if (passwordError) setPasswordError('');
    if (successMessage) setSuccessMessage('');
  };

  const onClickResetPassword = async () => {
    // 유효성 검사
    let hasError = false;

    if (!currentPassword.trim()) {
      setPasswordError('현재 비밀번호를 입력해 주세요.');
      hasError = true;
    }

    if (!newPassword.trim()) {
      setPasswordError('새 비밀번호를 입력해 주세요.');
      hasError = true;
    } else if (newPassword.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setPasswordError('새 비밀번호 확인을 입력해 주세요.');
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      hasError = true;
    }

    // 현재 비밀번호와 새 비밀번호가 같은지 확인
    if (currentPassword === newPassword) {
      setPasswordError('사용했던 비밀번호로는 변경할 수 없습니다.');
      hasError = true;
    }

    if (hasError) return;

    // 사용자 이메일이 없으면 에러
    if (!userEmail) {
      setPasswordError('사용자 정보를 불러올 수 없습니다. 다시 로그인해 주세요.');
      return;
    }

    try {
      // 현재 비밀번호 확인
      await loginUser({
        variables: {
          email: userEmail,
          password: currentPassword,
        },
      });

      // 현재 비밀번호 확인 성공 시 새 비밀번호로 변경
      const result = await resetUserPassword({
        variables: { password: newPassword },
      });

      if (result.data?.resetUserPassword) {
        setSuccessMessage('비밀번호가 성공적으로 변경되었습니다.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
      }
    } catch (error: any) {
      console.error('비밀번호 변경 실패:', error);
      // 로그인 실패 시 (현재 비밀번호가 틀린 경우)
      if (error.message?.includes('loginUser') || error.graphQLErrors) {
        setPasswordError('현재 비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    passwordError,
    successMessage,
    onChangeCurrentPassword,
    onChangeNewPassword,
    onChangeConfirmPassword,
    onClickResetPassword,
  };
}

export function usePointChargeHistory() {
  // 총 포인트 정보 가져오기
  const { data: userData, loading: userLoading, error: userError } = useQuery(FETCH_USER_LOGGED_IN);
  const userPoint = userData?.fetchUserLoggedIn?.userPoint;

  // 포인트 충전 내역 리스트 가져오기
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
    refetch,
  } = useQuery(FETCH_POINT_TRANSACTIONS_OF_LOADING, {
    variables: {
      page: 1,
      search: '',
    },
  });

  const pointTransactions = transactionsData?.fetchPointTransactionsOfLoading || [];
  const loading = userLoading || transactionsLoading;
  const error = userError || transactionsError;

  return {
    pointTransactions,
    totalPoint: userPoint?.amount || 0,
    loading,
    error,
    refetch,
    userPoint, // userPoint 자체도 반환
  };
}
