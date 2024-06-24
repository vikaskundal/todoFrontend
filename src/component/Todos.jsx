

export const createTodo=(title,description,time,date)=>{
    return{
        id:Math.random(),
        title,
        description,
        time,
        date,
        done:false
        
    }
}
