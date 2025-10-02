"use client"

import { withAuth } from "@/commons/hocs/auth"
import OpenapisPage from "@/components/myapis-list"


function OpenapisRoutePage() {

    
    return (
        <>
            <OpenapisPage/>            
        </>
    )
}

export default withAuth(OpenapisRoutePage)