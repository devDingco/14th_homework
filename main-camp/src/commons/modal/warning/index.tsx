"use client"

import { Modal } from 'antd'
import { useIsModal } from '@/commons/provider/isModalProvider';

const WarningModal = () => {
    // const router = useRouter()
    // const pathname = usePathname()
    
    const { isWarningModal, setIsWarningModal } = useIsModal()

    // const backtoPage = () => {
    //     pathname.split('/').at(-1) === 'edit' ? router.back() : console.log('?')
    // }

    return (
        <Modal
            open={isWarningModal?.open}
            centered
            okButtonProps={{hidden: true}}
            cancelButtonProps={{hidden: true}}
            width={'300px'}
            styles={{content:{
                padding: "40px",                
            }}}
            zIndex={10}
            onCancel={() => {
                setIsWarningModal({open: false, value:''})
            }}
            closable={true}
            maskClosable={true}
            destroyOnClose={true}
            // afterClose={backtoPage}
        >
            {isWarningModal?.value}
        </Modal>
    )
}

export default WarningModal
