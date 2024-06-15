import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth  from '../hooks/useAuth';

function Login(){

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const {setAuth} = useAuth();

    const errRef = useRef();

    
    function usernameChange(event){
        setUsername(event.target.value);
    }

    function passwordChange(event){
        setPassword(event.target.value)
    }

    const navigate = useNavigate();

    async function onSubmit(event){
        event.preventDefault();

        try{
            const response = await axios.post('http://localhost:3001/user',{
                username,
                password
            });
            console.log(response.data);

            setAuth(response.data);


            navigate('/dashboard'); 


        } catch (error){
            console.log(error);
            
            if (!error.response) {
                setErrMsg('Network error. Please check your internet connection.');
            } else if (error.response.status === 400) {
                setErrMsg('Invalid data. Please check your username and password.');
            } else if (error.response.status === 401) {
                setErrMsg('Unauthorized. Please check your credentials.');
            } else {
                setErrMsg('An unexpected error occurred. Please try again later.');
            }

            errRef.current.focus();

        }
        
    }

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    return (
        <div className='bg-white px-10 py-7 rounded-3xl border-2 font-squada-one mt-36 ml-28 mr-28'>


            <h1 className='text-5xl font-semibold text-center'>Welcome to Factored!</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <form onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label>
                        Username
                    </label>
                        <input 
                        onChange={usernameChange} 
                        value={username}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        />

                    <label>
                        Password
                    </label>
                        <input 
                        onChange={passwordChange} 
                        value={password}
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        />
                </div>
                <button className='w-full bg-blue-500 p-4 rounded-xl mt-4 text-white'>Login</button>
            </form>
        </div>
    )
}

export default Login;