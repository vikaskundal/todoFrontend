import axios from "axios";
import { useState } from "react"


export  const Signup=({onSignup,onCancel})=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [error,setError]=useState('');
    
    const handleSignup= async(e)=>{
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(username));
        try{
        const response= await axios.post('http://localhost:8000/auth/signup',{username,email,password});
        const token= response.data.data;
        localStorage.setItem('token',token);
        
        
        // singup is done and notify the  function in the todo component
        onSignup();
        }catch(error){
            setError('Error while signing up');
            console.log('error while signingup',error);
        }
        

    }
   
    return <>
             {/* Signup details */}
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">

                        <form onSubmit={handleSignup}
                        className="bg-red-300 flex flex-col items-center w-50 p-2 w-2/5 h-50 border solid black rounded-lg  ">
                                <h1 className="italic font-medium text-lg p-2 ">
                                    SignUp To Your Account
                                </h1>
                                <input
                                className="flex p-2 m-1 border black solid rounded-lg "
                                type="text"
                                placeholder="Username"
                                required
                                onChange={((e)=>{
                                    setUsername(e.target.value)
                                })
                                }/>
                            
                            <input
                            className="flex p-2 m-1 border black solid rounded-lg"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={((e)=>{
                                setEmail(e.target.value)
                            })}/>
                            <input
                                className="flex  p-2 m-1 border black solid rounded-lg"
                                type="password"
                                placeholder="Password"
                                onChange={((e)=>{
                                    setPassword(e.target.value)
                                })}
                            />
                            <div className="flex flex-row space-x-2 m-4">
                            <button
                                className="flex bg-green-300 p-2 border solid black rounded-lg"
                                type='submit' >SignUp</button>
                           
                            <button
                                className="flex bg-red-500 p-2 border solid black rounded-lg"
                                onClick={onCancel} >Cancel</button>
                            </div>
                           
                            
                        </form>
                    
                </div>

             
    </>
}