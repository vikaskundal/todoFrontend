import { useState } from 'react'
import './App.css'
import { TodoList } from './component/Todolist'

function App() {
  const [todos,setTodos]=useState([]);
  
  const  addTodo=(todo)=>{
    setTodos([...todos,todo])
    
  }
   const deleteTodo=(id)=>{
    setTodos(todos.filter(todo =>todo.id!==id));
  }
  const changeColor=(id)=>{
    setTodos(todos.map((todo)=>{
      if(todo.id===id){
        return {...todo,done:true}
      }
      return todo;
    }));
    

  }

  return (
    <>
        <TodoList todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} changeColor={changeColor}/>


    </>
  )
}

export default App;
