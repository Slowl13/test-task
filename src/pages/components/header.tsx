import useDataStore from "@/store/useDataStore"

export default function Header(){
    const { inputValue, setInputValue } = useDataStore();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return(
        <header className="h-[80px] bg-[rgb(32,35,41)] flex items-center justify-between md:pl-[20px] md:pr-[20px]">
            <img className="h-[40px]" src="/clipart2180147.png"></img>
            <input onChange={handleChange} className="bg-white h-[40px] w-[50%] md:w-md text-2xl pl-[10px] rounded-md"></input>
            <span className="md:w-[80px] flex justify-center">
                <img className="h-[40px]" src="/love-shirt.png"></img>
            </span>
        </header>
    )
}