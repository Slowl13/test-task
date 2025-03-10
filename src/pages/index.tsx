import { useEffect } from "react";
import Header from "./components/header";
import useDateStore from "@/store/useDataStore";
import Card from "./components/card";

export default function Home() {
  const { data, isLoading, page, fetchData, pageHalf, changePageHalf, inputValue } = useDateStore();


  useEffect( () => {
    fetchData();
  }, [fetchData, inputValue])

  const hasData = data && data.results;

  return (
    <div>
      <Header></Header>
      <div className="grid lg:grid-cols-5 justify-items-center gap-[40px] mt-[40px]">{hasData && (data.results.map((item, index)=> {
        if(pageHalf === 1 && index < 10){
          return <Card src={item.image} name={item.name}/>
        }
        
        if(pageHalf === 2 && index >= 10){
          return <Card src={item.image} name={item.name}/>
        }
      }))}</div>
      <button onClick={() => {
        changePageHalf(1);
        if(pageHalf === 1){
          changePageHalf(4);
        }
      }}>Prev</button>
      <button onClick={() => {
        changePageHalf(2);
        if(pageHalf === 2){
          changePageHalf(3);
        }
      }}>Next</button>
    </div> 
  );
}
