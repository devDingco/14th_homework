"use client"

import DaumPostcodeEmbed from 'react-daum-postcode';
import { Modal } from 'antd'
import { useIsEdit } from '@/commons/provider/isEditProvider';
import { IDaumPostcodeData, IPostcode } from './type';

const Postcode = (props: IPostcode) => {

    const { setPostData } = useIsEdit()

    const handleComplete = (data: IDaumPostcodeData) => {
        const boardAddressModal = {zipcode: "", address: "", addressDetail: ""}
        
        if(data.userSelectedType === "R") {
            boardAddressModal.address = data.address
        } else if (data.userSelectedType === "J") {
            boardAddressModal.address = data.jibunAddress
        }
        boardAddressModal.zipcode = data.zonecode
        
        setPostData({
            boardAddress: boardAddressModal
        })
        props.setIsModalOpen(false)
    }

    return (
        <Modal
            open={props.isModalOpen}
            centered
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
            width={'1000px'}
            styles={{content:{
                padding: "40px",                
            }}}
            zIndex={10}
            onCancel={()=>props.setIsModalOpen(false)}
            closable={true}
            maskClosable={true}
            destroyOnClose={true}
        >
            <DaumPostcodeEmbed onComplete={handleComplete}/>
        </Modal>
    )
}

export default Postcode