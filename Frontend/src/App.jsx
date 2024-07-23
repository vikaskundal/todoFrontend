import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { TodoList } from './component/Todolist'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    return Array.isArray(storedTodos) ? storedTodos : [];
  });



  


  // Save todos to local storage whenever they change
  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // adding the todo to the database 
  const addTodoToDB = async (newTodo) => {
    console.log('hi there');
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost:8000/api/todos', newTodo,
          {headers:{
                Authorization: `Bearer ${token}`// we need to send this in order to pass the middleware named verifyToken
          }}
        );
        const savedTodo = response.data;
        setTodos([...todos, savedTodo]);
        
          
        
        
      } catch (error) {
        console.log('error in the adding the todo to the DB', error);
  
      }
      
    }else{
      window.alert('please login to add the todo')
    }
    
     
  
   
        
    }
    
   
  // mark it as a Done
  const markAsDone = async (_id) => {
    const token=localStorage.getItem('token');
    if (token) {
      try {
      
        await axios.put(`http://localhost:8000/api/todos/${_id}`, { done: true},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }}
          
        );
        const updatedTodos = todos.map((todo => todo._id === _id ? { ...todo, done: true } : todo));
        setTodos(updatedTodos);
        
      
      
    } catch (error) {
      console.log('error in the marking todo is ', error);

    }
      
    }
    
  }




  // Deleting the todo  from local storage and DB
  const deleteTodo = async (_id) => {
    const token=localStorage.getItem('token');
    if (token) {
      try {
      
        await axios.delete(`http://localhost:8000/api/todos/${_id}`,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
      const updatedTodos = todos.filter(todo => todo._id !== _id);
      setTodos(updatedTodos);
        
      
      
      // updating the local storage along with the data base 


    }
    catch (error) {
      console.log('error message while deleting is', error)
      console.log(_id
      )

    }
      
    }
    
   

  }
  return (
    <>
      <TodoList todos={todos} addTodoToDS={addTodoToDB} 
      deleteTodo={deleteTodo} markAsDone={markAsDone}
       setTodos={setTodos} />

    </>
  )

}


// load todos from the local storage whenever the component is mounted 





export default App
