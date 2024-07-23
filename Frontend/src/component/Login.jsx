import { useState } from "react" 
import axios  from "axios";




export const  Login=({onLogin,onCancel})=>{
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    const handleLogIn= async(e)=>{
        e.preventDefault();
        localStorage.setItem('user',JSON.stringify(username));
        // 
        try{
            const response= await axios.post('http://localhost:8000/auth/login',{username,password});
            const token=response.data.data;
            // set the token in the local storage
            localStorage.setItem('token',token);
            
            
            // once login call the onLogin function which changes the login to logout
            onLogin();


            console.log('login successfull')


        }catch(error){
            setError('Invalid username or password try again')
            console.log('error while login',error);

        }
    }

    
    return <>
        {/* login details */}
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                    <form onSubmit={handleLogIn} 
                    className="bg-red-300 flex flex-col items-center w-50 p-2 w-2/5 h-50 border solid black rounded-lg  ">
                        <h1 className="italic font-medium text-lg p-2 ">
                            LogIn To Your Account
                        </h1>
                    {/*if user put the wrong password and username error will appear in good format*/}
                        {error && <p className="text-red-500 mb-2">{error}</p>}
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
                        className="flex flex p-2 m-1 border black solid rounded-lg"
                        type="password"
                        placeholder="Password"
                        onChange={((e)=>{
                            setPassword(e.target.value)
                        })}
                        required/>
                        <div className="flex flex-raw space-x-2 m-4">
                        <button
                        className="flex bg-green-300 p-2 border solid black rounded-lg"
                        type='submit'
                        >Login</button>
                        <button
                        className="flex bg-red-500 p-2 border solid black rounded-lg"
                        onClick={onCancel}
                        > Cancel</button>
                        </div>



                    </form>
            </div>

    
    </>

}


//