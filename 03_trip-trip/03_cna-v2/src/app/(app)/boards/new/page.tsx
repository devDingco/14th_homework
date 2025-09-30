'use client'
import { withAuth } from 'commons/hocs/withAuth'
// import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import BoardWritePage from 'components/boards-write'

function BoardsNewPage() {
  // useAuthGuard()
  return <BoardWritePage isEdit={false} />
}
export default withAuth(BoardsNewPage)
