"use client"

import { useEffect, useState } from "react"
import { getPokeMon } from "./getPokemon"
import styles from "./styles.module.css"
import { url } from "inspector"


export default function PokemonItem ({number}: {number: number}){

    const [data, setData] = useState({
        id: "",
        name: "",
        height: 0,
        weight: 0,
        sprites: "",
        koreanName: "",
        koreanGenus: "",
        flavor_text_entries: {flavor_text:""}
    })
    useEffect(()=>{
        getPokeMon(number).then(setData);
    },[number])

      const{
            id,
            name,
            height,
            weight,
            sprites,
            koreanName,
            koreanGenus,
            flavor_text_entries
        } = data;


        

    return(
        <div className={styles.cardContainer}>
            <div className={styles.pokemon} style={{backgroundImage: `url(${sprites})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition:"center"}}>
                <div className={styles.nameGroup}>
                    <div className={styles.Name}>
                        <div>{koreanName?? ""}</div>
                        <p>{name?? ""}</p>
                    </div>
                    No. {id? String(id).padStart(4,"0") : ""}
                </div>
                {/* <img src={sprites?? ""} style={{width: "100%", height: "70%", objectFit: "cover", position: "absolute", zIndex: 0}}/> */}

                <div className={styles.ContentsGroup}>
                    <div>
                        <p>{koreanGenus?? "???"}</p>
                        <div className={styles.spec}>
                            <div>{ height ? String(Number(height)/10)+"cm" : "???"}</div>
                            |
                            <div>{weight? String(Number(weight)/10)+"kg" :"???"}</div>
                        </div>
                    </div>
                    <div>{flavor_text_entries.flavor_text ?? ""}</div>
                </div>
            </div>
        </div>
    )
}