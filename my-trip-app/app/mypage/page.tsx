'use client';

import { useAuth } from "../commons/hooks/useAuth";

export default function Mypage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Mypage</h1>
    </div>
  );
}