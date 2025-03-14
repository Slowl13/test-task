import useDataStore from "@/store/useDataStore";
import useNavigatorStore from "@/store/useNavigationStore";

interface CardProps {
    src: string;
    name: string;
    characterId: number
  }

export default function Card({src, name, characterId}: CardProps){

    const {setNavigation} = useNavigatorStore()
    const {showCharacter} = useDataStore()

    return(
        <div onClick={() => {showCharacter(characterId); setNavigation("character")}} className="w-[200px] h-[400px] 2xl:w-[300px] 2xl:h-[350px] bg-[rgb(51,51,51)] rounded-md text-center text-white flex flex-col justify-between text-xl pt-[10px]">
            <p>{name}</p>
            <img className="rounded-full" src={src} alt="" />
        </div>
    )
}