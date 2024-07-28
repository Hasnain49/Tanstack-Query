import React from 'react'
import { useTodosIds } from '../services/queries'

const Todo = () => {
    const todosIdsQuery = useTodosIds()

    if(todosIdsQuery.isLoading){
        return <span>Loading...</span>
    }

    if(todosIdsQuery.isError){
        return <span>some error occurred!</span>
    }

    console.log(todosIdsQuery.data)
  return (
    <>{todosIdsQuery.data?.map((id)=> (<p key={id}>{id}</p>))}</>
  )
}

export default Todo