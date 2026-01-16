import './App.css'
import List from './compornents/List'
import Header from './compornents/Header'
import Editor from './compornents/Editor'
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo
} from "react";

const mockDate = [
  {
    id: 0,
    isDone: false,
    content: "react공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래연습하기",
    date: new Date().getTime(),
  }
]
function reducer(state, action) {
  switch (action.type) {
    case "CREATE": return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, isDone: !item.isDone }
          : item
      )
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId)
    default:
      return state;
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {

  const idRef = useRef(3)
  const [todos, dispatch] = useReducer(reducer, mockDate); // reducer,기본값

  const onCreate = useCallback((content) => { //onCreate실행
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime()
      }
    })
  }, [])

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId
    })
  }, []);

  //마운트 되었을때만 생성됨
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId
    })
  }, [])

  const memoizeDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete }
  }, [])

  return (
    <div className='app'>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizeDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App
