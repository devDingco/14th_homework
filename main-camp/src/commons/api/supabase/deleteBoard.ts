import { supabase } from "@/commons/libraries/supabase"

const deleteBoard = async () => {
    const result = await supabase.from("board").delete({
        writer: "철수",
        title: "안녕하세요",
        content: "반갑습니다!!",
    })
    
    return {
        data: result
    }

}
export default deleteBoard