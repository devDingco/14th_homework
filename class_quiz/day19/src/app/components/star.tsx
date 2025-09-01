"use client"

import { useState } from "react"

const Star = () => {
    const [starNum, setStarNum] = useState<number>(0)

    const yellowStarSrc = '/image/yellow_star.png'
    const grayStarSrc = '/image/gray_star.png'

    const test = (index: number) => {
        if (index === 1) {
            starNum === 1 ? setStarNum(0) : setStarNum(1)
        } else if (index === 2) {
            starNum === 2 ? setStarNum(1) : setStarNum(2)
        } else if (index === 3) {
            starNum === 3 ? setStarNum(2) : setStarNum(3)
        } else if (index === 4) {
            starNum === 4 ? setStarNum(3) : setStarNum(4)
        } else if (index === 5) {
            starNum === 5 ? setStarNum(4) : setStarNum(5)
        } else {
            setStarNum(index)
        }
    }

    return (
        <>
            <div id="starPoint" style={{ display: "flex" }}>
                {(() => {
                    if (starNum < 1) return <img id="star1" src={grayStarSrc} onClick={() => test(1)} style={{ width: "50px", cursor: "pointer" }}/>
                    if (starNum >= 1) return <img id="star1" src={yellowStarSrc} onClick={() => test(1)} style={{ width: "50px", cursor: "pointer" }}/>
                })()}
                {(() => {
                    if (starNum < 2) return <img id="star2" src={grayStarSrc} onClick={() => test(2)} style={{ width: "50px", cursor: "pointer" }}/>
                    if (starNum >= 2) return <img id="star2" src={yellowStarSrc} onClick={() => test(2)} style={{ width: "50px", cursor: "pointer" }}/>
                })()}
                {(() => {
                    if (starNum < 3) return <img id="star3" src={grayStarSrc} onClick={() => test(3)} style={{ width: "50px", cursor: "pointer" }}/>
                    if (starNum >= 3) return <img id="star3" src={yellowStarSrc} onClick={() => test(3)} style={{ width: "50px", cursor: "pointer" }}/>
                })()}
                {(() => {
                    if (starNum < 4) return <img id="star4" src={grayStarSrc} onClick={() => test(4)} style={{ width: "50px", cursor: "pointer" }}/>
                    if (starNum >= 4) return <img id="star4" src={yellowStarSrc} onClick={() => test(4)} style={{ width: "50px", cursor: "pointer" }}/>
                })()}
                {(() => {
                    if (starNum < 5) return <img id="star5" src={grayStarSrc} onClick={() => test(5)} style={{ width: "50px", cursor: "pointer" }}/>
                    if (starNum >= 5) return <img id="star5" src={yellowStarSrc} onClick={() => test(5)} style={{ width: "50px", cursor: "pointer" }}/>
                })()}
            </div>
            {starNum}점
        </>
    )
}

export default Star