import { Login } from "./Login";
import { Signup } from "./Signup";
import {createTodo } from "./Todos";
import axios  from "axios";
import React, {  useEffect, useState } from "react";


export const TodoList=({todos,addTodoToDS,deleteTodo,markAsDone,setTodos})=>{
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [date,setDate]=useState("");
    const [time,setTime]=useState("");
    const [isLoggedIn,setisLoggedIn]=useState(false);
    const [showlogin,setShowLogIn]=useState(false);
    const [showsignup,setShowSignUp]=useState(false);
    const [showUserName,SetShowUserName] = useState('');

    // logic of display of username

  

    // handle the login logic

    useEffect(()=>{
        const savedtoken=localStorage.getItem('token');
       
        if(savedtoken){
            setisLoggedIn(true);
        }
       
    },[])
    // fetching the Todos from the backend and puting it in the localstorage
    const fetchTodos = async () => {
        const token = localStorage.getItem('token');
        const user= localStorage.getItem('user');
        
      
        try {
           // Assuming you stored the token in local storage
          if (token) {
          const response = await axios.get('http://localhost:8000/api/todos', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          SetShowUserName(user);
          console.log('after using the axios');
          setTodos(response.data);
        }else{
            localStorage.removeItem('todos')
            setTodos([])
          
        }
          // localStorage.setItem('todos', JSON.stringify(response.data));
        } catch (error) {
          console.log('unable to fetch the todos', error);
        }
      };
   
    const handleLogIn =()=>{
        setisLoggedIn(true);
        setShowLogIn(false);
        fetchTodos(); // This should log
        setTodos(todos);

    }
    // handle the singup 
    const handleSignUp=async()=>{
        setisLoggedIn(true);
        setShowSignUp(false);
        fetchTodos();// above function helps to store the token and fetch the todos from the DS
        setTodos(todos);
    }
    // remove the token from local storage
    const handleLogOut=()=>{
        setisLoggedIn(false);  
        localStorage.removeItem('token');
        localStorage.removeItem('todos');
        localStorage.removeItem('user');
        setTodos([]);
        
    }
    
    
         

    
    const handleAddTodo= async()=>{
        
        
        if(!title|| !description || !time|| !date){
            alert('please enter all the fields')

            
        }else{
            console.log('before addtodo function');
            const newTodo= createTodo(title,description,time,date);
            await addTodoToDS(newTodo);
            
            clearInputs();
        }
    };

    const clearInputs=()=>{

        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
    }
   


    
    
    
    return (
        <div className="p-1 flex flex-col  space-x-2 h-screen md:flex-row">{/*this is the main div*/}
            <div  className="w-full bg-red-100 flex flex-col   justify-start items-center rounded-lg md:w-3/10  ">{/*Add you Todo and inputs*/}
                <div className="font-serif fond-medium m-2 p-2 bg-blue-500 rounded-lg shadow-lg">
                        <h2>Add You Todo</h2>
                        
                </div>
                {/*make this input to the burger menu once it comes sd */}
               <div className="flex flex-col items-center w-full p-2  ">{/*inputs*/}
                        <input className="mb-2 p-2 border border-gray-400 rounded-lg w-full hover:shadow-glow" type="text" placeholder="Title" required
                         value={title}
                         onChange={(e)=>setTitle(e.target.value)}  />
                        <textarea className="mb-2 p-2 border border-gray-400 rounded-lg w-full hover:shadow-glow h-80"  type="text" placeholder="Description" required 
                         value={description}
                         onChange={(e)=>setDescription(e.target.value)}   />
                        <div className="flex flex-raw space-x-1 m-1 p">
                        <input className="mb-2 p-2 border border-gray-400 rounded-lg w-1/2  hover:shadow-glow "  type="date"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}/>
                        <input className="mb-2 p-2 border border-gray-400 rounded-lg w-1/2 hover:shadow-glow"  type="time"
                          value={time}
                          onChange={(e)=>setTime(e.target.value)}  />
                        </div>
                        <div className="flex flex-raw space-x-1">
                        <button className="p-2 bg-red-400 border-4 borer-stone-900 shadow-md rounded-lg hover:shadow-glow"  type="sumbit"
                         onClick={clearInputs}   >
                        DELETE
                        </button>
                        <button className="p-2 bg-green-400 border-4 borer-stone-900 shadow-md rounded-lg hover:shadow-glow "  type="sumbit"
                         onClick={handleAddTodo}   >
                        ADD
                        </button>
                        </div>
                </div>
            </div>
            <div className="w-7/10 bg-blue-100 rounded-lg flex flex-col w-full ">{/*work todo and Todolist*/}
                <div className="flex  justify-between font-serif fond-medium m-2 p-2 bg-blue-500 rounded-lg shadow-lg flex justify-center">
                            <h1 className="flex text-3xl p-2">Work To Do</h1>
                            {!isLoggedIn ? (
                                <div className="flex space-x-3">
                                    <button className="bg-green-600 text-white px-4 py-2 border-solid rounded"
                                    onClick={()=>{setShowLogIn(true)}}>
                                        Login
                                    </button>
                                    <button
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={()=>{setShowSignUp(true)}}>
                            
                                    Signup
                                   </button>
                                </div>
                            ):(<>
                                <div className="flex space-x-2 flex-end py-1">
                                    <div className="flex bg-red-100 border solid rounded-lg p-2">
                                        Hi, {showUserName}!
                                    </div>
                                    <button
                                    className=" flex bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handleLogOut}>
                                    Logout
                                    </button>
                                </div>
                                </>
                            )}
                           
                </div>
                
                <div className="overflow-y-auto font-serif fond-medium m-2 p-2 bg-blue-500 rounded-lg shadow-lg h-full">
                    {/*todo list*/}
                    {/*Todos  component*/}

                    {/* login Model */}
                    {showlogin && (
                        <Login 
                        className='flex justify-center items-center'
                         onLogin={handleLogIn}
                        onCancel={()=>{setShowLogIn(false)}} />
                    )}
                    {/* Signup Modal */}
                    {showsignup && (
                    <Signup
                    onSignup={handleSignUp}
                    onCancel={() => setShowSignUp(false)}/>
                
            )}


                    
                    
                    {todos.map((todo)=>(
                        
                        <div key={todo._id} className={`${todo.done?'bg-green-400': 'bg-white'} p-2 m-1 rounded shadow-lg flex flex-col `}>
                            
                            <div className="flex justify-between "> {/*div containing title and data/time */}
                            <div className="py-0.5 border-2 border-red-900 rounded-lg p-1">{todo.title}</div>
                            <div className="flex  space-x-2 ">
                            <div className="p-0.5 border-2 border-red-900 rounded">{todo.date}</div>
                            <div className="p-0.5 border-2 border-red-900 rounded">{todo.time}</div>
                            </div>
                            
                            </div>
                            <div className="p-2  flex justify-between rounded-lg">
                                
                                {todo.description}
                                
                                
                                <div className="flex flex-raw space-x-1">
                                <button className="flex p-0.5 border-2 border-stone-900  bg-green-300 shadow-md rounded-lg hover:shadow-glow self-end"
                                onClick={()=>markAsDone(todo._id)}>
                                    Done</button>
                                <button className="flex p-0.5 bg-red-400 border-2 border-stone-900 shadow-md rounded-lg hover:shadow-glow self-end"
                                onClick={()=>deleteTodo(todo._id)}>
                                    Delete</button>
                                </div>
                            
                            </div>
                            
                            
                        </div>
                        
                    ))}
                </div>
            </div>


            

        </div>
    )
}
