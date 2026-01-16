import "./list.css"
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";
import { TodoStateContext } from "../App";

const List = () => {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const getFilteredDate = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) => //모든 todos를 순회하며 결과에 맞는것만 반환
      todo.content.toLowerCase().includes(search.toLowerCase())// 문자열 확인하여 t/f값을 반환함.
    );
  };

  const filteredTodos = getFilteredDate();

  const { totalCount, doneCount, notDoneCount } =
    useMemo(() => {
      console.log("getAn~~~ 실행!!!!")
      const totalCount = todos.length;
      const doneCount = todos.filter((todo) => todo.isDone).length;
      const notDoneCount = totalCount - doneCount;
      return {
        totalCount,
        doneCount,
        notDoneCount
      }
    }, [todos]); //이값이 변경 되었을때만 콜백함수가 실행된다.


  return (
    <div className="list">
      <h4>Todo List 🌱</h4>
      <div className="tableContainer">
        <table>
          <tr>
            <th>total</th>
            <th>done</th>
            <th>notDone</th>
          </tr>
          <tr>
            <td>{totalCount}</td>
            <td>{doneCount}</td>
            <td>{notDoneCount}</td>
          </tr>
        </table>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        type="text"
        placeholder="검색어를 입력하세요" />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          // 리스트 형태로 prop을 전달하게 되면 key라는 고유한 값을 전달해줘야함.
          return <TodoItem key={todo.id} {...todo}
          />
        })}
      </div>

    </div>

  );
};


export default List;