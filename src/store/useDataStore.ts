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
    pageHalf: number,
    currentCharacterId: number | null,
    currentCharacterObj: results|null,
    fetchData: () => Promise<void>,
    prevPage: () => void,
    nextPage: () => void,
    changePageHalf: (num:number) => void,   
    showCharacter: (id:number) => void,
    getCharacterData: (id: number|null) => Promise<void>
}

const useDataStore = create<DataState>((set, get) => ({
    inputValue: '',
    data: null,
    isLoading: false,
    pageHalf:1,
    currentCharacterId: null,
    currentCharacterObj: null,
    url: 'https://rickandmortyapi.com/api/character/',

    fetchData: () => {
        set({isLoading: true});

        const { url } = get();

        return fetch(url)
        .then(res => res.json())
        .then((data) => {set({ data, isLoading: false}); console.log(data)})
    },

    nextPage: () => {
        const { data} = get();

        if (data?.info.next !== null) set({ url: data?.info.next})
        
    },

    prevPage: () => {
        const { data} = get();

        if (data?.info.prev !== null) set({ url: data?.info.prev})

    },

    changePageHalf: (num) => {       

        set({pageHalf:num});

        if(num === 3){
            set({pageHalf:1});
            get().nextPage();
        }

        if(num === 4){
            set({pageHalf:2});
            get().prevPage();
        }
    },

    setInputValue: (value) => {
        set({inputValue: value, pageHalf: 1, url: `https://rickandmortyapi.com/api/character/?page=1&name=${value}`});
    },

    showCharacter(id) {
        set({currentCharacterId: id})
    },

    getCharacterData(id) {
        return fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then((data) => {set({currentCharacterObj:data});console.log(data)})
    }
}));

export default useDataStore;