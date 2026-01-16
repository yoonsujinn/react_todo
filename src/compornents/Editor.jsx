import "./editor.css"
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  const {onCreate}= useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const contentRef = useRef(); 
  const onChangeContent = (e) => {
    setContent(e.target.value);
  } //인풋값이 content값으로 저장이됨.

  const onSubmit = () => {
    if(content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("") //인풋안에 내용이 빈 내용으로 초기화 된다.
  };

  const onKeydown = (e) => {
    if(e.keyCode === 13) {
      onSubmit();
    }
  }

  //onSubmit 실행시 App.jsx의 onCreate가 실행됨
  return <div className="editor">
    <input
      onKeyDown={onKeydown}
      ref={contentRef}
      value={content}
      onChange={onChangeContent}
      placeholder="새로운 Todo..." />
    <button onClick={onSubmit}>추가</button>
  </div>
}

export default Editor;