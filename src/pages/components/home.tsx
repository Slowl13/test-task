import { useEffect } from "react";
import useDateStore from "@/store/useDataStore";
import Card from "./card";


export default function Home(){
    const { data, url, fetchData, pageHalf, changePageHalf, inputValue } = useDateStore();

    useEffect( () => {
    fetchData();
    }, [fetchData, inputValue, url])

    const hasData = data && data.results;

    return (
    <div>

        <div className="grid lg:grid-cols-5 justify-items-center gap-[40px] mt-[40px]">{hasData && (data.results.map((item, index)=> {
            if(pageHalf === 1 && index < 10){
                return <Card key={index} src={item.image} name={item.name} characterId={item.id}/>
            } else if(pageHalf === 2 && index >= 10){
                return <Card key={index} src={item.image} name={item.name} characterId={item.id}/>
            }
        }))}</div>

        <button onClick={() => {
            changePageHalf(1);
            if(pageHalf === 1 && hasData && data.info.prev !== null){
                changePageHalf(4);
            }
        }}>Prev</button>

        <button onClick={() => {
            if(hasData && data?.results.length >= 10){
                changePageHalf(2);
            }
            if(pageHalf === 2){
                changePageHalf(3);
            }
        }}>Next</button>
        
    </div> 
    );
}