'use client'

import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import BoardWritePage from 'components/boards-write'

export default function BoardEditPage() {
  useAuthGuard()
  return <BoardWritePage isEdit={true} />
}
