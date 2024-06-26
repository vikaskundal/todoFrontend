import { v4 as uuidv4 } from 'uuid';


export const createTodo=(title,description,time,date)=>{
    return{
        id:uuidv4(),
        title,
        description,
        time,
        date,
        done:false
        
    }
}
