// import React from 'react'
const App = () => {
  const TARGET_LEN = 5

  const noStar = './assets/images/outlineStar.png'
  const fillStar = './assets/images/fillStar.png'

  const [stars, setStars] = React.useState(Array(TARGET_LEN).fill(0))

  const changeStars = (clickedIdx) => {
    // 클릭된 인덱스까지 1(채움), 나머지 0(비움)
    const next = Array.from({ length: TARGET_LEN }, (_, i) => (i <= clickedIdx ? 1 : 0))
    setStars(next)
  }
  const sum = stars.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return (
    <div>
      {stars.map((val, idx) =>
        val === 0 ? (
          <img key={idx} src={noStar} alt="no star" onClick={() => changeStars(idx)} />
        ) : (
          <img key={idx} src={fillStar} alt="fill star" onClick={() => changeStars(idx)} />
        )
      )}
      <p>{sum}점</p>
    </div>
  )
}
