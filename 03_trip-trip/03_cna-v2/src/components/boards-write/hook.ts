'use client'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { BoardFormProps } from './types'
import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
  UpdateBoardDocument,
  UpdateBoardMutation,
  UpdateBoardMutationVariables,
} from 'commons/graphql/graphql'
import { isYouTubeUrl } from 'commons/utils/url'

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
    CreateBoardDocument
  )
  const [updateBoard] = useMutation<UpdateBoardMutation, UpdateBoardMutationVariables>(
    UpdateBoardDocument
  )

  console.log(data?.fetchBoard?.boardAddress)
  // 작성자 변경 불가
  const [name, setName] = useState('')
  // 비밀번호 수정 불가
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState(props.isEdit ? data?.fetchBoard?.title ?? '' : '')
  const [content, setContent] = useState(props.isEdit ? data?.fetchBoard?.contents ?? '' : '')
  // 주소 input
  const [address, setAddress] = useState({
    zipcode: props.isEdit ? data?.fetchBoard?.boardAddress?.zipcode ?? '' : '',
    base: props.isEdit ? data?.fetchBoard?.boardAddress?.address ?? '' : '',
    detail: props.isEdit ? data?.fetchBoard?.boardAddress?.addressDetail ?? '' : '',
  })
  const [link, setLink] = useState(props.isEdit ? data?.fetchBoard?.youtubeUrl ?? '' : '')

  const [nameError, setNameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const [linkError, setLinkError] = useState('')
  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled = !name || !password || !title || !content

  // 모달 + 우편번호
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleComplete = (data: any) => {
    const base = data.address || data.roadAddress || data.jibunAddress || ''
    setAddress({
      zipcode: data.zonecode || '',
      base,
      detail: '',
    })
    onToggleModal()
  }

  // 변경값 상태관리
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const onChangeAddress = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target
    console.log('🚀 ~ onChangeAddress ~ name:', name)
    console.log('🚀 ~ onChangeAddress ~ value:', value)

    setAddress({
      ...address,
      [name]: value,
    })
  }

  const onChangeLink = (event: ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value)
  }

  const onClickSignup = async () => {
    //새글 등록하기일 경우
    if (props.isEdit === false) {
      let hasError = false

      if (name.trim() === '') {
        setNameError('필수입력 사항입니다.')
        hasError = true
      } else {
        setNameError('')
      }

      if (password.length === 0) {
        setPasswordError('필수입력 사항입니다.')
        hasError = true
      } else {
        setPasswordError('')
      }

      if (title?.trim() === '') {
        setTitleError('필수입력 사항입니다.')
        hasError = true
      } else {
        setTitleError('')
      }

      if (content?.trim() === '') {
        setContentError('필수입력 사항입니다.')
        hasError = true
      } else {
        setContentError('')
      }

      if (link && !isYouTubeUrl(link)) {
        setLinkError('유튜브 주소 형식에 알맞지 않습니다.')
        hasError = true
      } else {
        setLinkError('')
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password,
              title,
              contents: content,
              youtubeUrl: link,
              boardAddress: {
                zipcode: address.zipcode,
                address: address.base,
                addressDetail: address.detail,
              },
              images: ['', ''],
            },
          },
        })

        console.log('data', data)
        alert('게시글이 등록되었습니다!')
        // 해당글의 상세페이지로 이동하기
        router.push(`/boards/${data?.createBoard._id}`)
      }
    }

    // 기존의 글을 수정하는 경우
    else if (props.isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (content?.trim() === '' && title?.trim() === '') {
        setContentError('필수입력 사항입니다.')
        setTitleError('필수입력 사항입니다.')
        return
      }
      if (content?.trim() === '') {
        setContentError('필수입력 사항입니다.')
        return
      }
      if (title?.trim() === '') {
        setTitleError('필수입력 사항입니다.')
        return
      }
      if (link && !isYouTubeUrl(link)) {
        setLinkError('유튜브 주소 형식에 알맞지 않습니다.')
        return
      }

      // 비밀번호 확인하기

      const 입력받은비밀번호 = prompt('글을 작성할때 입력하셨던 비밀번호를 입력해주세요')
      const updateInput: any = {}
      if (title?.trim() && title !== data?.fetchBoard?.title) {
        updateInput.title = title
      }

      if (content?.trim() && content !== data?.fetchBoard?.contents) {
        updateInput.contents = content
      }

      if (link !== data?.fetchBoard?.youtubeUrl) {
        updateInput.youtubeUrl = link
      }

      const boardAddress: any = {}
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
        console.log('수정된 항목만 날아가고있나? ::: updateInput', updateInput)
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: 입력받은비밀번호,
              boardId: editId,
            },
          })

          if (result.data) {
            console.log('기존의 글을 수정하는 경우:::', result)
            alert('게시글이 성공적으로 수정되었습니다!')
          } else {
            alert('수정에 실패했습니다.')
          }
          // 수정이 완료되면 상세 화면으로 이동하기
          router.push(`/boards/${editId}`)
        } catch (error) {
          // 에러 발생 시 처리
          if (error instanceof ApolloError) {
            const errorMessages = error.graphQLErrors.map((err) => err.message)
            alert(errorMessages.join(', '))
          } else {
            console.error('네트워크에러 발생')
          }
        }
      } else {
        alert('수정된 내용이 없습니다.')
      }
    }
  }

  return {
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeAddress,
    onChangeLink,
    onClickSignup,
    isButtonDisabled,
    data,
    name,
    password,
    title,
    content,
    address,
    link,
    nameError,
    passwordError,
    titleError,
    contentError,
    linkError,
    isModalOpen,
    onToggleModal,
    handleComplete,
  }
}
