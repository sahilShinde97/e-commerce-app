import axios from 'axios';
import React, {  useState } from 'react'
import { backendUrl } from '../App.jsx';

const Login = ({setToken}) => {


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')


    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password});
            if (response.data.success) {
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900'>
        <div className='backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl px-10 py-8 max-w-md w-full text-white'>
            <h1 className='text-3xl font-extrabold mb-6 text-center tracking-wide'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-5'>
                    <p className='text-sm font-semibold text-white mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-lg w-full px-4 py-2 border border-white/30 bg-white/10 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-fuchsia-500 transition' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-5'>
                    <p className='text-sm font-semibold text-white mb-2'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-lg w-full px-4 py-2 border border-white/30 bg-white/10 placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-fuchsia-500 transition' type="password" placeholder='Enter your password' required />
                </div>
                <button className='mt-4 w-full py-2 px-4 rounded-lg text-white bg-gradient-to-r from-pink-600 to-fuchsia-500 hover:from-pink-700 hover:to-fuchsia-600 transition-all shadow-lg font-semibold tracking-wide' type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
