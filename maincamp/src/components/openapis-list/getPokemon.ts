import { IFlavorText, IKoreanGenus, IKoreanName } from "./types";


export const getPokeMon = async(id: number) => {

    // pokemon: 영어 json
    // species: 한글로 되어있는 거 찾을 수 있음(이름, 종명, 플래버 텍스트)
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(result => result.json());
    const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(result => result.json());

    const koreanName: string | undefined = (species.names as IKoreanName[]).find( n => n.language.name === "ko")?.name;
    const koreanGenus: string | undefined = (species.genera as IKoreanGenus[]).find(g => g.language.name === "ko")?.genus;
    const flavorTexts: {flavor_text: string, version: string} = (species.flavor_text_entries as IFlavorText[]).filter(f => f.language.name === "ko").map((f) => ({
            flavor_text: f.flavor_text,
            version: f.version.name,
        }))[0] ?? {flavor_text: "", version: ""}

    
    return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        sprites: pokemon.sprites.other["dream_world"].front_default ?? pokemon.sprites.other["official-artwork"].front_default,
        koreanName,
        koreanGenus,
        flavor_text_entries: flavorTexts
    }
}