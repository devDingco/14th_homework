'use client'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { BoardFormProps } from './types'
import {
  BoardAddressInput,
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
  UpdateBoardDocument,
  UpdateBoardInput,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
} from 'commons/graphql/graphql'
import { isYouTubeUrl } from 'commons/utils/url'
import { Modal } from 'antd'
import { Address } from 'react-daum-postcode'

export default function useBoardForm(props: BoardFormProps) {
  const router = useRouter()
  const params = useParams()

  const editId = props.isEdit && typeof params.boardId === 'string' ? params.boardId : ''
  // 수정하는 경우, 수정을 위한 초기값 보여주기
  const { data } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
    variables: { boardId: editId },
    skip: !props.isEdit,
  })

  //그래프큐엘 셋팅
  const [createBoard] = useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument,
    {
      refetchQueries: [
        { query: FetchBoardsDocument, variables: { search: '' } },
        { query: FetchBoardsCountDocument, variables: { search: '' } },
      ],
    }
  )
  const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
    UpdateBoardDocument,
    {
      refetchQueries: [
        { query: FetchBoardsDocument, variables: { search: '' } },
        { query: FetchBoardsCountDocument, variables: { search: '' } },
        { query: FetchBoardDocument, variables: { boardId: editId } },
      ],
    }
  )

  const [boardValue, setBoardValue] = useState({
    name: '',
    password: '',
    title: data?.fetchBoard?.title ?? '',
    content: data?.fetchBoard?.contents ?? '',
    link: data?.fetchBoard?.youtubeUrl ?? '',
    images: data?.fetchBoard?.images ?? ['', '', ''],
  })
  // 주소 input
  const [address, setAddress] = useState({
    zipcode: props.isEdit ? data?.fetchBoard?.boardAddress?.zipcode ?? '' : '',
    base: props.isEdit ? data?.fetchBoard?.boardAddress?.address ?? '' : '',
    detail: props.isEdit ? data?.fetchBoard?.boardAddress?.addressDetail ?? '' : '',
  })

  const [boardError, setBoardError] = useState({
    nameError: '',
    passwordError: '',
    titleError: '',
    contentError: '',
    linkError: '',
  })
  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled =
    !boardValue.name || !boardValue.password || !boardValue.title || !boardValue.content

  // 모달 + 우편번호
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleComplete = (data: Address) => {
    const base = data.address || data.roadAddress || data.jibunAddress || ''

    setAddress({
      ...address,
      zipcode: data.zonecode || '',
      base,
      detail: '',
    })
    onToggleModal()
  }

  // 변경값 상태관리
  const onChangeValue = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target
    setBoardValue({
      ...boardValue,
      [id]: value,
    })
  }

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setAddress({
      ...address,
      [name]: value,
    })
  }

  // image index에 일치하게 업로드
  const setImageByIndex = (idx: number, url: string) => {
    setBoardValue((prev) => {
      const next = { ...prev, images: [...prev.images] }
      next.images[idx] = url
      return next
    })
  }

  const onClickSignup = async () => {
    //새글 등록하기일 경우
    if (props.isEdit === false) {
      let hasError = false

      if (boardValue.name.trim() === '') {
        setBoardError({ ...boardError, nameError: '필수입력 사항입니다.' })
        hasError = true
      }

      if (boardValue.password.length === 0) {
        setBoardError({ ...boardError, passwordError: '필수입력 사항입니다.' })
        hasError = true
      }

      if (boardValue.title?.trim() === '') {
        setBoardError({ ...boardError, titleError: '필수입력 사항입니다.' })
        hasError = true
      }

      if (boardValue.content?.trim() === '') {
        setBoardError({ ...boardError, contentError: '필수입력 사항입니다.' })
        hasError = true
      }

      if (boardValue.link && !isYouTubeUrl(boardValue.link)) {
        setBoardError({ ...boardError, linkError: '유튜브 주소 형식에 알맞지 않습니다.' })
        hasError = true
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: boardValue.name,
              password: boardValue.password,
              title: boardValue.title,
              contents: boardValue.content,
              youtubeUrl: boardValue.link,
              boardAddress: {
                zipcode: address.zipcode,
                address: address.base,
                addressDetail: address.detail,
              },
              images: boardValue.images,
            },
          },
        })

        Modal.success({
          content: '게시글이 등록되었습니다!',
        })
        // 해당글의 상세페이지로 이동하기
        router.push(`/boards/${data?.createBoard._id}`)
      }
    }

    // 기존의 글을 수정하는 경우
    else if (props.isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (boardValue.content?.trim() === '' && boardValue.title?.trim() === '') {
        setBoardError({ ...boardError, contentError: '필수입력 사항입니다.' })
        setBoardError({ ...boardError, titleError: '필수입력 사항입니다.' })
        return
      }
      if (boardValue.content?.trim() === '') {
        setBoardError({ ...boardError, contentError: '필수입력 사항입니다.' })
        return
      }
      if (boardValue.title?.trim() === '') {
        setBoardError({ ...boardError, titleError: '필수입력 사항입니다.' })
        return
      }
      if (boardValue.link && !isYouTubeUrl(boardValue.link)) {
        setBoardError({ ...boardError, linkError: '유튜브 주소 형식에 알맞지 않습니다.' })
        return
      }

      // 비밀번호 확인하기
      const 입력받은비밀번호 = prompt('글을 작성할때 입력하셨던 비밀번호를 입력해주세요')

      const updateInput: UpdateBoardInput = {}
      if (boardValue.title?.trim() && boardValue.title !== data?.fetchBoard?.title) {
        updateInput.title = boardValue.title
      }

      if (boardValue.content?.trim() && boardValue.content !== data?.fetchBoard?.contents) {
        updateInput.contents = boardValue.content
      }

      if (boardValue.link !== data?.fetchBoard?.youtubeUrl) {
        updateInput.youtubeUrl = boardValue.link
      }

      if (boardValue.images !== data?.fetchBoard.images) {
        updateInput.images = boardValue.images
      }

      const boardAddress: BoardAddressInput = {}
      if (address.zipcode !== data?.fetchBoard?.boardAddress?.zipcode) {
        boardAddress.zipcode = address.zipcode
      }

      if (address.base !== data?.fetchBoard?.boardAddress?.address) {
        boardAddress.address = address.base
      }

      if (address.detail !== data?.fetchBoard?.boardAddress?.addressDetail) {
        boardAddress.addressDetail = address.detail
      }
      if (Object.keys(boardAddress).length > 0) {
        updateInput.boardAddress = boardAddress
      }

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(updateInput).length > 0) {
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: 입력받은비밀번호,
              boardId: editId,
            },
          })

          if (result.data) {
            Modal.success({
              content: '게시글이 성공적으로 수정되었습니다!',
            })
          } else {
            Modal.error({
              content: '수정에 실패했습니다.',
            })
          }
          // 수정이 완료되면 상세 화면으로 이동하기
          router.push(`/boards/${editId}`)
        } catch (error) {
          // 에러 발생 시 처리
          if (error instanceof ApolloError) {
            const errorMessages = error.graphQLErrors.map((err) => err.message)
            Modal.error({
              content: errorMessages.join(', '),
            })
          } else {
            Modal.error({
              content: '네트워크에러 발생',
            })
          }
        }
      } else {
        Modal.warning({
          content: '수정된 내용이 없습니다.',
        })
      }
    }
  }

  return {
    onChangeValue,
    onChangeAddress,
    onClickSignup,
    setImageByIndex,
    isButtonDisabled,
    boardValue,
    address,
    boardError,
    isModalOpen,
    onToggleModal,
    handleComplete,
  }
}
