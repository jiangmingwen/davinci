import {
  applyMiddleware,
  combineReducers,
  createStore,
  ReducersMapObject
} from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'

// 定义将始终存在于应用程序中的 Reducer
const staticReducers = {
  global: reducer
}

// Configure the store
function configureStore(initialState = {}) {
  const store: any = createStore(
    createReducer({}),
    initialState,
    applyMiddleware(thunk)
  )

  // 添加一个对象以跟踪已注册的异步 Reducer
  store.asyncReducers = {}

  //创建注入 reducer 函数
  // 此函数添加 async reducer，并创建一个新的组合 reducer
  store.injectReducer = (key: string, asyncReducer: ReducersMapObject = {}) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  // 返回修改后的 store
  return store
}
const store = configureStore()

export const injectReducer = (
  key: string,
  asyncReducer: ReducersMapObject = {}
) => {
  store.asyncReducers[key] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}

export default store

function createReducer(asyncReducers: ReducersMapObject = {}) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}
