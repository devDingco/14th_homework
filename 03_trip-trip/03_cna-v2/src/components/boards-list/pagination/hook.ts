import { useState } from 'react'
import { PaginationHookProps } from './types'

export const usePagination = (props: PaginationHookProps) => {
  const { refetch, setCurrentPage, lastPage } = props
  const PAGE_GROUP_SIZE = 5

  const [startPage, setStartPage] = useState(1)
  const [leftDisabled, setLeftDisabled] = useState(true)
  const [rightDisabled, setRightDisabled] = useState(false)

  const onClickPrevPage = () => {
    if (startPage === 1) return

    setStartPage(startPage - PAGE_GROUP_SIZE)

    refetch({
      page: startPage - PAGE_GROUP_SIZE,
    })
    setCurrentPage(startPage - PAGE_GROUP_SIZE)

    if (startPage - PAGE_GROUP_SIZE <= 126) {
      setRightDisabled(false) // 오른쪽 비화살표 활성화 조건
    }
    if (startPage - PAGE_GROUP_SIZE <= 1) {
      setLeftDisabled(true) // 왼쪽 화살표 비활성화 조건
    }
  }

  const onClickNextPage = () => {
    if (startPage + PAGE_GROUP_SIZE <= lastPage) {
      setStartPage(startPage + PAGE_GROUP_SIZE)
      refetch({
        page: startPage + PAGE_GROUP_SIZE,
      })
      setCurrentPage(startPage + PAGE_GROUP_SIZE)
    }

    if (startPage + PAGE_GROUP_SIZE >= 6) {
      setLeftDisabled(false) // 왼쪽 화살표 활성화 조건
    }
    if (startPage + PAGE_GROUP_SIZE > 126) {
      setRightDisabled(true) // 오른쪽 화살표 비활성화 조건
    }
  }

  const onClickPage = (page: number) => {
    refetch({
      page,
    })
    setCurrentPage(page)
  }

  return {
    startPage,
    leftDisabled,
    rightDisabled,
    onClickPrevPage,
    onClickNextPage,
    onClickPage,
  }
}
