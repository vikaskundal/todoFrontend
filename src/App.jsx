import { useEffect, useState } from 'react'
import './App.css'
import { TodoList } from './component/Todolist'

function App() {
  const [todos,setTodos]=useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    return storedTodos || [];});
  
  const  addTodo=(todo)=>{ 
    const updatedTodos=([...todos,todo])
    setTodos(updatedTodos);  }
    // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);



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
 
  // load todos from the local storage whenever the component is mounted 
  

  return (
    <>
        <TodoList todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} changeColor={changeColor}/>
      


    </>
  )
}

export default App;
