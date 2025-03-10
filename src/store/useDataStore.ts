import { create } from "zustand"

interface results {
    name: string,
    image: string
}


interface apiResponse {
    info: object,
    results: results[]
}

interface DataState {
    inputValue: string,
    setInputValue: (value: string) => void,
    data: apiResponse|null,
    isLoading: boolean,
    page: number,
    pageHalf: number,
    fetchData: () => Promise<void>,
    changePageHalf: (num:number) => void,   
}

const useDataStore = create<DataState>((set, get) => ({
    inputValue: '',
    data: null,
    isLoading: false,
    pageHalf:1,
    page: 1,
    fetchData: () => {
        set({isLoading: true});

        const { page } = get();

        const { inputValue } = get();

        const url = inputValue === "" ? `https://rickandmortyapi.com/api/character/?page=${page}` : `https://rickandmortyapi.com/api/character/?page=${page}&name=${inputValue}`

        return fetch(url)
        .then(res => res.json())
        .then((data) => {set({ data, isLoading: false}); console.log(data)})
    },
    changePageHalf: (num) => {
        const { page } = get();
        const currentPage = page;
        

        set({pageHalf:num});
        
        if(num === 3){
            set({pageHalf:1});
            set({page: currentPage+1});
            get().fetchData();
        }

        if(num === 4){
            set({pageHalf:2});
            set({page: currentPage-1});
            get().fetchData();
        }
    },
    setInputValue: (value) => {
        set({inputValue: value});
        set({page: 1, pageHalf: 1})
    }
}));

export default useDataStore;