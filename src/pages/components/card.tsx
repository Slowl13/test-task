import useDataStore from "@/store/useDataStore";
import useNavigatorStore from "@/store/useNavigationStore";

interface CardProps {
    src: string;
    name: string;
    characterId: number
  }

export default function Card({src, name, characterId}: CardProps){

    const {setNavigation} = useNavigatorStore()
    const {showCharacter, isFavorite, setFavorite} = useDataStore()

    return(
        <div onClick={() => {showCharacter(characterId); setNavigation("character")}} className="w-[200px] h-[300px] 2xl:w-[300px] 2xl:h-[350px] bg-[rgb(51,51,51)] rounded-md text-center text-white text-xl relative">
            <img className="rounded-full w-40 2xl:w-60 mx-auto my-[25px] border-solid border-2 border-black" src={src} alt="" />
            <span>{name}</span>
            <img onClick={(event) => setFavorite(event, characterId)} src={"/" + isFavorite(characterId) + ".png"} alt="" className="w-10 absolute top-2 right-2"/>
        </div>
    )
}