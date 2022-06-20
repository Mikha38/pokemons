const { legacy_createStore, combineReducers } = require("redux")

//MiddleWare & Thunks

//InitialState
const initialState = {
    currentPage: 1,
    idCatchingPokemons: ['1'],
    pokemonsOnPage: [],
    totalCountOfPokemons: 100,
}

//Actions
const ADD = 'ADD'
const CATCH = 'CATCH'
const NEXT_PAGE = 'NEXT_PAGE'
const PREV_PAGE = 'PREV_PAGE'
const TOTAL_COUNT_OF_POKEMONS = 'TOTAL_COUNT_OF_POKEMONS'

//Action creators
export const nextPage_AC = () => ({type: NEXT_PAGE})
export function prevPage_AC(){
    return {
        type: PREV_PAGE
    }
}
export function getPokemonsForPage_AC(arrFromAPI){
    return {
        type: ADD,
        arrFromAPI: arrFromAPI
    }
}
export function catchOrRelease_AC(id){
    return {
        type: CATCH,
        id: id
    }
}
export const totalCountOfPokemons_AC = (count) => ({type: TOTAL_COUNT_OF_POKEMONS, count: count})

//Reducers
function getPokemonsForPageReducer(state = initialState.pokemonsOnPage, action) {
    if(action.type === ADD){
        return action.arrFromAPI
    }
    return state
}
function catchOrReleaseReducer(state = initialState.idCatchingPokemons, action){
    if(action.type === CATCH){
        if(state.includes(action.id)){
            return state.filter(el => el !== action.id)
        } else{
            return [...state, action.id]
        }
    }
    return state
}
function currentPageReducer(state = initialState.currentPage, action){
    if(action.type === NEXT_PAGE){
        return state + 1
    }
    if(action.type === PREV_PAGE){
        return state - 1
    }
    return state
}
function totalCountOfPokemonsReducer(state = initialState.totalCountOfPokemons, action){
    if(action.type === TOTAL_COUNT_OF_POKEMONS){
        return action.count
    }
    return state
}

//My combineReducers
function combineReducers2(obj){
    return function(state = {}, action){
        const newState = {} 
        for(const key in obj){
            newState[key] = obj[key](state[key], action)
        }
        return newState
    }
}

const reducer = combineReducers2({
    pokemonsOnPage: getPokemonsForPageReducer,
    idCatchingPokemons: catchOrReleaseReducer,
    currentPage: currentPageReducer,
    totalCountOfPokemons : totalCountOfPokemonsReducer,
})


const store = legacy_createStore(reducer);
export default store
//store.dispatch( {type: CATCH, id: 5})
//console.log(store.getState());

// combineReducers написать свою реализацию
// подключить redux (connect или хуки)
// компоненты высшего порядка
// Среда 17:30