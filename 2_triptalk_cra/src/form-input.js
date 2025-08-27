
export const 작은인풋 = (props) => {

    return (
        <>
            <div className="게시글_인풋_작은거">
                <div className="flex_row_gap4">{props.Input_Title} <div className="color_red">{props.Input_Star}</div> </div>
                <input type="text" placeholder={props.Input_Placeholder} className="작은인풋" onChange={props.onChange} ></input>
                <div className="text_red">{props.errorMessage}</div>
            </div>
        </>
    )
}

export const 긴인풋 = (props) => {


    return (

        <>
            <div className="게시글_인풋_긴거">
                <div className="flex_row_gap4">{props.Input_Title} <div className="color_red">{props.Input_Star}</div> </div>
                <input type="text" placeholder={props.Input_Placeholder} className="긴인풋" onChange={props.onChange}></input>
                <div className="text_red">{props.errorMessage}</div>
            </div>
        </>

    )
}

export const 큰인풋 = (props) => {


    return (

        <>
            <div className="게시글_인풋_큰거">
                <div className="flex_row_gap4">{props.Input_Title} <div className="color_red">{props.Input_Star}</div> </div>
                <textarea type="text" placeholder={props.Input_Placeholder} className="큰인풋" onChange={props.onChange}></textarea>
                <div className="text_red">{props.errorMessage}</div>
            </div>
        </>

    )
}