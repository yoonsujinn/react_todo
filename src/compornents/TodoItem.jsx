import "./todoItem.css"
import {memo, useContext} from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDone, content, date }) => {
  const { onUpdate, onDelete} = useContext(TodoDispatchContext);
  
  const onChangeCheckbox = () => {
    onUpdate(id);
  }

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return <div className="todoItem">
    <input
      onChange={onChangeCheckbox}
      readOnly
      checked={isDone}
      type="checkbox" />
    <div className="content">{content}</div>
    <div className="date">{new Date(date).toLocaleDateString()}</div>
    <button onClick={onClickDeleteButton}>삭제</button>
  </div>
}

// export default memo(TodoItem, (prevProps, nextProps)=> {
//   //콜백함수를 통해 memo를 커스텀함
//   //반환값에 따라 props가 바뀌었는지 판단
//   //T -> props바뀌지 않음 : 리렌더링X
//   //F -> props 바뀜 : 리렌더링 O

//   if(prevProps.id !== nextProps.id) return false;
//   if(prevProps.isDone !== nextProps.isDone) return false;
//   if(prevProps.content !== nextProps.content) return false;
//   if(prevProps.date !== nextProps.date) return false;

//   return true;
// });
export default memo(TodoItem)