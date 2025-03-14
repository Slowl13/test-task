import { create } from "zustand"

interface nav {
    nav: "home" | "favorites" | "character",
    setNavigation: (str:"home" | "favorites" | "character") => void
}

const useNavigatorStore = create<nav>((set, get) => ({
    nav: "home",

    setNavigation: (str) => {
        set({nav:str})
    }
}))

export default useNavigatorStore