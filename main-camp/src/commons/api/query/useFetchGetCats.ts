"use client"

const useFetchGetCats = async () => {
    const url: string = process.env.NEXT_PUBLIC_THECAT_URL ?? "https://api.thecatapi.com/"
    const api_key: string = process.env.NEXT_PUBLIC_THECAT_APIKEY ?? "live_9Sl23hUw1NmgTQjv8UdGPOixEH2TKQCJRpCwVWvYoSgVVmZJGjOd1r4W6bjnfx8i"

    let getData
    try {
        if (!url && !api_key) return
        const result = await fetch(`${url}v1/images/search?limit=10`, {
            headers: {
                'x-api-key': api_key
            }
        })
        const data = await result.json()
        console.log(data)
        getData = data
    } catch(e: unknown) {
        alert(e)
    }

    return {
        catsArray: getData
    }
}

export default useFetchGetCats