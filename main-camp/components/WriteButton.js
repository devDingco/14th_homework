
const WriteButton = (props) => {
    let btnComponent
    switch (props.p) {
        case "취소": {
            btnComponent =
            <button className="write_cancel_btn sb_18_24" style={{ whiteSpace: "nowrap" }}>{props.p}</button>
            break
        }
        case "등록하기": {
            btnComponent =
            <button className="write_confirm_btn sb_18_24">{props.p}</button>
            break
        }
        default:
    }
    return (
        btnComponent
    )
}