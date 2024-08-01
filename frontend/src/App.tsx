// import axios from "axios"
// import { useEffect, useState } from "react"

import Todos from "./components/Todos"

function App() {

  // const {data, setData} = useState([])

  // useEffect(()=>{
  //   axios.get('http://localhost:8080/todos').then((response)=>{setData(response.data)}).catch((error)=>{console.log(error)})
  // },[])

  return (
    <Todos />
  )
}

export default App
