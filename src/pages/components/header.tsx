import useDataStore from "@/store/useDataStore"
import useNavigatorStore from "@/store/useNavigationStore";

export default function Header(){
    const { setInputValue} = useDataStore();
    const { setNavigation } = useNavigatorStore();

    const handleChangeMain = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return(
        <header className="h-[80px] bg-[rgb(32,35,41)] flex items-center justify-between md:pl-[20px] md:pr-[20px]">
            <img className="h-[40px]" onClick={() => {setNavigation("home")}} src="/clipart2180147.png"></img>
            <input onChange={handleChangeMain} className="bg-white h-[40px] w-[50%] md:w-md text-2xl pl-[10px] rounded-md"></input>
            <span onClick={() => {setNavigation("favorites")}} className="md:w-[80px] flex justify-center">
                <img className="h-[40px]" src="/love-shirt.png"></img>
            </span>
        </header>
    )
}