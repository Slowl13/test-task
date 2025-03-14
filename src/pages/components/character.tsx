import useDataStore from "@/store/useDataStore"
import { useEffect } from "react"

export default function Character(){

    const {currentCharacterId, currentCharacterObj, getCharacterData} = useDataStore()

    useEffect( () => {
        getCharacterData(currentCharacterId)
    }, [currentCharacterId])

    return(
        <div className="bg-[rgb(51,51,51)] w-xl flex flex-col text-white items-center">
            <img src={currentCharacterObj?.image}></img>
            <p>{currentCharacterObj?.name}</p>
            <p>Status: {currentCharacterObj?.status}</p>
            <p>Species: {currentCharacterObj?.species}</p>
            {currentCharacterObj?.type !== "" && <p>Type: {currentCharacterObj?.type}</p>}
            <p>Gender: {currentCharacterObj?.gender}</p>
            <p>Origin: {currentCharacterObj?.origin.name}</p>
        </div>
    )
}