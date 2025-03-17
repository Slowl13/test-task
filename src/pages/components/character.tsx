import useDataStore from "@/store/useDataStore"
import { useEffect } from "react"

export default function Character(){

    const {currentCharacterId, currentCharacterObj, getCharacterData, setFavorite, isFavorite} = useDataStore()

    useEffect( () => {
        getCharacterData(currentCharacterId)
    }, [currentCharacterId])

    return(
        <div className="bg-[rgb(51,51,51)] min-w-xs w-[50%] mx-auto flex flex-col text-white items-center justify-around relative">
            <img onClick={(event) => setFavorite(event, currentCharacterId)} src={"/" + isFavorite(currentCharacterId) + ".png"} alt="" className="top-0 right-1 w-10 absolute lg:top-2 lg:right-2"/>
            <img className="mt-10" src={currentCharacterObj?.image}></img>
            <p>{currentCharacterObj?.name}</p>
            <p>Status: {currentCharacterObj?.status}</p>
            <p>Species: {currentCharacterObj?.species}</p>
            {currentCharacterObj?.type !== "" && <p>Type: {currentCharacterObj?.type}</p>}
            <p>Gender: {currentCharacterObj?.gender}</p>
            <p className="mb-10">Origin: {currentCharacterObj?.origin.name}</p>
        </div>
    )
}