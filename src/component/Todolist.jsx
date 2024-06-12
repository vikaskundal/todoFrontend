import React, { useState } from "react";
import {createTodo } from "./Todos";

export const TodoList=({todos,addTodo,deleteTodo,changeColor})=>{
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [date,setDate]=useState("");
    const [time,setTime]=useState("");
    

    
    const handleAddTodo=()=>{
        const newTodo= createTodo(title,description,time,date);
        if(!title|| !description || !time|| !date){
            alert('please enter all the fields')
        }else{
        addTodo(newTodo);
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
        <div className="p-1 flex space-x-2 h-screen">{/*this is the main div*/}
            <div  className="w-3/10 bg-red-100 flex flex-col justify-start items-center rounded-lg ">{/*Add you Todo and inputs*/}
                <div className="font-serif fond-medium m-2 p-2 bg-blue-500 rounded-lg shadow-lg">
                        <h2>Add You Todo</h2>
                </div>
               <div className="flex flex-col items-center w-full p-2">{/*inputs*/}
                        <input className="mb-2 p-2 border border-gray-400 rounded-lg w-full hover:shadow-glow" type="text" placeholder="Title" required
                         value={title}
                         onChange={(e)=>setTitle(e.target.value)}  />
                        <textarea className="mb-2 p-2 border border-gray-400 rounded-lg w-full hover:shadow-glow h-40"  type="text" placeholder="Description" required 
                         value={description}
                         onChange={(e)=>setDescription(e.target.value)}   />
                        <div className="flex flex-raw space-x-1 m-1 p">
                        <input className="mb-2 p-2 border border-gray-400 rounded-lg w-1/2 hover:shadow-glow "  type="date"
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
            <div className="w-7/10 bg-blue-100 rounded-lg flex flex-col ">{/*work todo and Todolist*/}
                <div className="font-serif fond-medium m-2 p-2 bg-blue-500 rounded-lg shadow-lg flex justify-center">
                            <h1>Work to do</h1>
                </div>
                <div className="overflow-y-auto font-serif fond-medium m-2 p-2 bg-blue-500 rounded-lg shadow-lg h-full">
                    {/*todo list*/}
                    {/*Todos  component*/}
                    {todos.map((todo)=>(
                        
                        <div key={todo.id} className={`${todo.done?'bg-green-400': 'bg-white'} p-2 m-1 rounded shadow-lg flex flex-col `}>
                            
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
                                onClick={()=>changeColor(todo.id)}>
                                    Done</button>
                                <button className="flex p-0.5 bg-red-400 border-2 border-stone-900 shadow-md rounded-lg hover:shadow-glow self-end"
                                onClick={()=>deleteTodo(todo.id)}>
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