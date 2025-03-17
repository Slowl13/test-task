import { useEffect } from "react";
import useDateStore from "@/store/useDataStore";
import Card from "./card";
import useNavigatorStore from "@/store/useNavigationStore";


export default function Home(){
    const { data, url, fetchData, inputValue, changePage, favoriteData, favoriteIds, fetchFavoriteData, favoriteCurrentPages, changeFavortitePage} = useDateStore();
    const { nav } = useNavigatorStore();

    useEffect( () => {
        fetchData();
    }, [fetchData, inputValue, url])

    useEffect( () => {
        fetchFavoriteData();
    }, [fetchFavoriteData, inputValue, favoriteIds])

    const hasData = data && data?.results && nav === "home";
    const hasFavoriteData = nav === "favorites" && favoriteIds.length !== 0
    const hasFavoriteDataEmpty = nav === "favorites" && favoriteIds.length === 0

    return (
    <div>
        {
            hasFavoriteDataEmpty && <p className="text-center pt-10 text-xl">Список избранных пуст. Добавьте персонажей с главной страницы!</p>
        }

        <div className="grid grod-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-center gap-[40px] mt-[40px]">

            {hasData && (data?.results.map((item, index)=> {
                return <Card key={index} src={item.image} name={item.name} characterId={item.id}/>
            }))}

            {hasFavoriteData  &&  favoriteData.map((item, index) => {
                if (index < 20 * favoriteCurrentPages && index >= 20 * (favoriteCurrentPages-1)) return <Card key={index} src={item.image} name={item.name} characterId={item.id}/> 
            })}

        </div>
        <div className="flex justify-center gap-[20px] my-15">
            <button className="bg-cyan-500 w-20 h-10 hover:bg-fuchsia-500" onClick={() => {changePage("prev"); changeFavortitePage("prev")}}>Prev</button>

            <button className="bg-cyan-500 w-20 h-10 hover:bg-fuchsia-500" onClick={() => {changePage("next"); changeFavortitePage("next")}}>Next</button>
        </div>
    </div> 
    );
}