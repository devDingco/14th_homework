const getDogApi = async () => {
    const v = await fetch("https://dog.ceo/api/breeds/image/random/20")
    const obj = await v.json()
    console.log("결과: ", obj)
    const dogArr = obj.message
    return dogArr.map(v_1 => `
                <div>
                    <img src="${v_1}" width="100px" />
                </div>
            `).join("")
}