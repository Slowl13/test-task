import { useEffect } from "react";
import Header from "./components/header";
import useDateStore from "@/store/useDataStore";
import Card from "./components/card";
import Home from "./components/home";
import useNavigatorStore from "@/store/useNavigationStore";
import Character from "./components/character";

export default function Index() {
  const {nav} = useNavigatorStore()

  return (
    <div>
      <Header></Header>
      {nav === "home" && <Home></Home>}
      {nav === "character" && <Character></Character>}
    </div> 
  );
}
