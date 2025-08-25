const getDogApi = async (dogNumber) => { // <number>
    try {
        const v = await fetch(`https://dog.ceo/api/breeds/image/random/${dogNumber}`)
        const obj = await v.json()
        console.log("결과: ", obj)
        return  obj.message
    } catch(e) {
        alert(e)
    }
}