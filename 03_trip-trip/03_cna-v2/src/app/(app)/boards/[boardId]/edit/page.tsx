'use client'

import { withAuth } from 'commons/hocs/withAuth'
import BoardWritePage from 'components/boards-write'

function BoardEditPage() {
  // useAuthGuard()
  return <BoardWritePage isEdit={true} />
}

export default withAuth(BoardEditPage)
