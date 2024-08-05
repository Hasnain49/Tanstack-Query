import React from 'react'
import { useTodos, useTodosIds } from '../services/queries'
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '../services/mutations'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Todo } from '../types/todo'


const Todos = () => {
    const todosIdsQuery = useTodosIds()

    const createTodoMutation = useCreateTodo();
    
    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();

    const {register, handleSubmit, reset} = useForm<Todo>()
    if(createTodoMutation.isSuccess){
      // reset(undefined)
    }
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

    const handleMarkAsDone = (data: Todo | undefined) =>{
      if(data){
        updateTodoMutation.mutate({...data, checked: true})
      }
    }

    const handleDeleteTodoSubmit = async(id: number)=>{
      await deleteTodoMutation.mutateAsync(id)
    }
  return (
    <>
    {/* {todosIdsQuery.data?.map((id)=> (<p key={id}>ID: {id}</p>))} */}
    <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
      <h4>Todo Form</h4>
      <label htmlFor="title">Title</label>
      <input type="text" placeholder='Enter title' id='title' {...register('title')}/>
      <br />
      <label htmlFor="desc">Description</label>
      <input type="text" placeholder='Description' id='desc' {...register("description")}/>
      <br />

      <button type="submit" disabled={createTodoMutation.isPending}>{createTodoMutation.isPending ? "creating..." : "Submit"}</button>
    </form>
     <ul>
       {todosQueries.map(({data})=>(
        <li key={data?.id}>
          <div>ID: {data?.id}</div>
          <span>
            <strong>Title</strong> {data?.title}
            <strong>Description</strong> {data?.description}
          </span>
          <div>
            <button onClick={()=> handleMarkAsDone(data)} disabled={data?.checked}>{data?.checked? "Done" : "Mark as done"}</button>
            {data && data?.id && <button onClick={()=> handleDeleteTodoSubmit(data.id!)}>Delete</button>}
          </div>
        </li>
       ))}
     </ul>
    </>
  )
}

export default Todos