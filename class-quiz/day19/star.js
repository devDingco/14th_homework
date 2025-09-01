const Star = () => {


    const [Rating, setRating] = React.useState(0)

    const click = (event) =>{
            console.log(event.target.id)
            setRating(Rating => event.target.id)

    }


return(
    <>
        <div>
            <img id='1' onClick={click} src={1 <= Rating ? "./star_yellow.png" : "./star_gray.png"}/>
            <img id='2' onClick={click} src={2 <= Rating ? "./star_yellow.png" : "./star_gray.png"}/>
            <img id='3' onClick={click} src={3 <= Rating ? "./star_yellow.png" : "./star_gray.png"}/>
            <img id='4' onClick={click} src={4 <= Rating ? "./star_yellow.png" : "./star_gray.png"}/>
            <img id='5' onClick={click} src={5 <= Rating ? "./star_yellow.png" : "./star_gray.png"}/>
        </div>
        <span>{Rating}점</span>
    </>

)
}