import React from 'react'
import { useTodos, useTodosIds } from '../services/queries'


const Todo = () => {
    const todosIdsQuery = useTodosIds()
    const todosQueries = useTodos(todosIdsQuery.data)

    if(todosIdsQuery.isLoading){
        return <span>Loading...</span>
    }

    if(todosIdsQuery.isError){
        return <span>some error occurred!</span>
    }

    console.log(todosIdsQuery.data)
  return (
    <>
    {/* {todosIdsQuery.data?.map((id)=> (<p key={id}>ID: {id}</p>))} */}
     <ul>
       {todosQueries.map(({data})=>(
        <li key={data?.id}>
          <div>ID: {data?.id}</div>
          <span>
            <strong>Title</strong> {data?.title}
            <strong>Description</strong> {data?.description}
          </span>
        </li>
       ))}
     </ul>
    </>
  )
}

export default Todo