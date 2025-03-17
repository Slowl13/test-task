import Header from "./components/header";
import Home from "./components/home";
import useNavigatorStore from "@/store/useNavigationStore";
import Character from "./components/character";

export default function Index() {
  const {nav} = useNavigatorStore()

  return (
    <div>
      <Header></Header>
      {nav === "character" ? <Character></Character> : <Home></Home>}
    </div> 
  );
}
