'use client'
import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import BoardWritePage from 'components/boards-write'

export default function BoardsNewPage() {
  useAuthGuard()
  return <BoardWritePage isEdit={false} />
}
