import { supabase } from "@/commons/libraries/supabase"
import { IPostSupaData } from "@/components/myapis-list"

const createBoard = async (props: IPostSupaData) => {

    const result = await supabase.from("board").insert({
        writer: props.writer,
        title: props.title,
        contents: props.contents,
    })

    return {
        data: result
    }
}
export default createBoard