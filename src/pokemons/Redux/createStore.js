const initialState = {
    ara: 0,
    bara: 1000
}

function r1(state = initialState.ara, action) {
  if (action.type === "INC") {
    return state + 1;
  }

  return state;
}
function r2(state = initialState.bara, action) {
    if(action.type === 'SEC'){
        return state / 2
    }

    return state
}

function combineReducers(obj){
    return function(state, action){
        let newState = {}
        for(const key in obj){
            newState[key] = obj[key](state[key], action)
        }
        return newState
    }
}
const reducers = combineReducers({
    ara: r1,
    bara: r2
})

function mineCreateStore(reducer){
    let state = reducer({}, {}) //Верно?
    let subscribes = []
    return {
        getState: () => state,
        dispatch: (action) => {
            state = reducer(state, action)
            subscribes.forEach(fn => fn(state))
        },
        subscribe: (fn) => {
            subscribes = [...subscribes, fn]
            return () => {
                subscribes = subscribes.fill(fn => fn !== fn)
            }
        }
    }
}



const store = mineCreateStore(reducers)
/*const unsubscribe1 = store.subscribe((value) => {
    console.log(value)
  })*/
//store.dispatch({type: "SEC"})
//console.log(store.getState())

//unsubscribe1()

const logger = (store) => next => action =>{
    console.log('dispatching')
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
const logger2 = (store) => next => action =>{
    console.log('dispatching222')
    let result = next(action)
    console.log('next state222', store.getState())
    return result
}
//logger(store)({type: "SEC"})
function applyMiddleware(store, midlewares){
    midlewares = midlewares.slice()
    midlewares.reverse()
    let dispatch = store.dispatch
    midlewares.forEach(fn => {
        dispatch = fn(store)(dispatch)
    })
    return Object.assign({}, store, {dispatch})
}
ara = applyMiddleware(store, [ logger, logger2 ])
ara.dispatch({type: "SEC"})
//Реализовать subscribe()
//Разобраться с миддлваре
//Редакс тулкит

//Воскресение 20:00