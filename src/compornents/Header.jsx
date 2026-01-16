import "./header.css"
import {memo} from "react"

const Header = () => {
  return <div className="header">
    <h2>오늘은 📅</h2>
    <h1>{new Date().toDateString()}</h1>
  </div>
}

export default memo(Header); 
//최적화된 header가 export됨