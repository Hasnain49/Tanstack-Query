import React from 'react'
import { useTodos, useTodosIds } from '../services/queries'
import { useCreateTodo } from '../services/mutations'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Todo } from '../types/todo'


const Todos = () => {
    const todosIdsQuery = useTodosIds()

    const createTodoMutation = useCreateTodo()

    const {register, handleSubmit} = useForm<Todo>()
    const todosQueries = useTodos(todosIdsQuery.data)

    if(todosIdsQuery.isLoading){
        return <span>Loading...</span>
    }

    if(todosIdsQuery.isError){
        return <span>some error occurred!</span>
    }

    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data)=>{
        createTodoMutation.mutate(data);
    }
  return (
    <>
    {/* {todosIdsQuery.data?.map((id)=> (<p key={id}>ID: {id}</p>))} */}
    <form onSubmit={handleSubmit(handleCreateTodoSubmit)}></form>
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

export default Todos