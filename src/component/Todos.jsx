import React from "react"
let nextID=0;

export const createTodo=(title,description,time,date)=>{
    return{
        id:nextID++,
        title,
        description,
        time,
        date,
        done:false
        
    }
}
