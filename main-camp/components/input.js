const WriteInput = (props) => {
    let inputComponent
    switch (props.label) {
        case "작성자": {
            inputComponent = 
            <div className="input_frame_620w_80h flex_column">
                <label className="label_620w_24h me_16_24">{props.label}</label>
                <input className="input_620w_48h input_border_gray r_16_24" placeholder={props.placeholder}></input>
            </div>
            break
        }
        case "비밀번호": {
            inputComponent = 
            <div className="input_frame_620w_80h flex_column">
                <label className="label_620w_24h me_16_24">{props.label}</label>
                <input className="input_620w_48h input_border_gray r_16_24" placeholder={props.placeholder}></input>
            </div>
            break
        }
        default:
    }
    return (
        inputComponent
    )
}