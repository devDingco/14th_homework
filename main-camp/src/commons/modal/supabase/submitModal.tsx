"use client"

import { IPostSupaData } from '@/components/myapis-list'
import useMyApisList, { IUseMyApisList } from '@/components/myapis-list/hook'
import { Modal, Input } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface ISubmitModal {
    isModalOpen: boolean, 
    setIsModalOpen: (t: boolean) => void,
    onClickSubmit: () => Promise<void>
    postSupaData: IPostSupaData
    setPostSupaData: Dispatch<SetStateAction<IPostSupaData>>
}

const SubmitModal = (props: ISubmitModal) => {

    return (
        <Modal
            open={props.isModalOpen}
            centered
            onOk={() => {
                props.onClickSubmit()
            }}
            okButtonProps={{}}
            cancelButtonProps={{}}
            width={'300px'}
            styles={{content:{
                padding: "40px",                
            }}}
            zIndex={10}
            onCancel={() => {
                props.setIsModalOpen(false)
                props.onClickSubmit()
            }}
            closable={true}
            maskClosable={false}
            destroyOnClose={true}
        >
            <Input placeholder="작성자" 
                onChange={(event) => props.setPostSupaData((prev: IPostSupaData) => ({
                    ...prev,
                    writer: event.target.value
                }))}
            />
            <Input placeholder="제목" 
                onChange={(event) => props.setPostSupaData((prev: IPostSupaData) => ({
                    ...prev,
                    title: event.target.value
            }))}
            />
            <Input placeholder="내용" 
                onChange={(event) => props.setPostSupaData((prev: IPostSupaData) => ({
                    ...prev,
                    contents: event.target.value
                }))}
            />
        </Modal>
    )
}

export default SubmitModal
