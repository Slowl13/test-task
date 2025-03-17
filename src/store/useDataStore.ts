import { create } from "zustand"

interface results {
    id: number,
    status: string,
    species: string,
    type: string,
    gender: string,
    name: string,
    origin: {
        name: string
    }
    image: string,
}

interface info {
    count: number,
    pages: number,
    next: string|null,
    prev: string|null
}

interface apiResponse {
    info: info,
    results: results[]
}

interface DataState {
    inputValue: string,
    setInputValue: (value: string) => void,

    data: apiResponse|null,
    isLoading: boolean,
    url: string,

    currentCharacterId: number,
    currentCharacterObj: results|null,

    favoriteIds: Array<number>,
    isFavorite: (id: number) =>  "active"|"inactive",
    setFavorite: (event: React.MouseEvent<HTMLImageElement>, id: number) => void,
    favoriteData: results[],
    fetchFavoriteData: () => Promise<void> | void,
    filterFavoriteData: () => void,

    favoriteTotalPages: number,
    favoriteCurrentPages: number,
    changeNumberOfPages: ()=> void,
    changeFavortitePage: (action: "next"|"prev") => void,

    fetchData: () => Promise<void>,

    changePage: (action: "next"|"prev") => void,
    showCharacter: (id:number) => void,
    getCharacterData: (id: number|null) => Promise<void>
}

const useDataStore = create<DataState>((set, get) => ({
    inputValue: '',
    data: null,
    isLoading: false,
    currentCharacterId: 0,
    currentCharacterObj: null,
    favoriteData: [],
    favoriteCurrentPages: 1,
    favoriteTotalPages: 1,
    url: 'https://rickandmortyapi.com/api/character/',
    favoriteIds: typeof window !== "undefined" && JSON.parse(localStorage.getItem("favorite") || '[]'),

    fetchData: () => {
        set({isLoading: true});

        const { url } = get();

        return fetch(url)
        .then(res => res.json())
        .then((data) => {set({ data, isLoading: false}); console.log(data)})
    },

    changePage: (action) => {
        const { data } = get();

        data?.info[action] !== null && set({url: data?.info[action]})
    },

    changeFavortitePage: (action) => {
        const {favoriteCurrentPages, favoriteTotalPages} = get()

        action === "next" && favoriteCurrentPages >= 1 && favoriteCurrentPages < favoriteTotalPages && set({favoriteCurrentPages: favoriteCurrentPages+1})
        action === "prev" && favoriteCurrentPages > 1 && favoriteCurrentPages <= favoriteTotalPages && set({favoriteCurrentPages: favoriteCurrentPages-1})
    },

    setInputValue: (value) => {
        set({inputValue: value, url: `https://rickandmortyapi.com/api/character/?page=1&name=${value}`});
    },

    showCharacter: (id) => {
        set({currentCharacterId: id})
    },

    getCharacterData: (id) => {
        return fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then((data) => {set({currentCharacterObj:data});console.log(data)})
    },

    isFavorite: (id) => {
        const { favoriteIds } = get()

        return favoriteIds.some((item) => item === id) ? "active" : "inactive"
    },

    setFavorite: (event, id) => {
        event.stopPropagation();

        const {favoriteIds} = get();

        const newFavorite: Array<number> = favoriteIds.some((item) => item === id) ? favoriteIds.filter((elem) => {return elem !== id}) : [id, ...favoriteIds]

        console.log(favoriteIds.length > newFavorite.length ? "уехало" : "приехало")

        set({favoriteIds: newFavorite})

        localStorage.setItem("favorite", JSON.stringify(newFavorite))

        
    },

    fetchFavoriteData: async () => {
        const {favoriteIds, filterFavoriteData} = get();

        set({isLoading: true});

        if (favoriteIds.length === 0) {
            set({ favoriteData: [], isLoading: false });
            return;
        }

        const res = await fetch(`https://rickandmortyapi.com/api/character/[${[...favoriteIds]}]`)
        const favoriteData = await res.json()
        set({ favoriteData, isLoading: false })

        filterFavoriteData();
    },

    filterFavoriteData: () => {
        const {favoriteData, inputValue, changeNumberOfPages} = get();

        const newArr = favoriteData.filter(elem => elem.name.toLowerCase().includes(inputValue.toLowerCase()));

        set({favoriteData:[...newArr]})

        changeNumberOfPages();
    },

    changeNumberOfPages: () => {
        const{ favoriteData } = get();

        set({favoriteTotalPages: Math.ceil(favoriteData.length/20), favoriteCurrentPages:1}) 
    }
}));

export default useDataStore;