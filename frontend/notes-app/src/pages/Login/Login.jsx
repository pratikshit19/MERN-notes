import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';



const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if(!validateEmail(email)){
    setError("Please enter a valid email address");
    return;
  }

  if(!password){
    setError("Please enter a password");
    return;
  }

  setError("");


  //login api call
  try{
    const response = await axiosInstance.post("/login",{
      email: email,
      password: password,
    });

    //handle successfull login
    if(response.data && response.data.accessToken){
      localStorage.setItem("token", response.data.accessToken);
      navigate("/dashboard");
    }
  } catch (error){
    //handle login error
    if(error.response && error.response.data && error.response.data.message){
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occured. Please try again.");
    }
  }

};



  return (
    <>
    <div className='min-h-screen flex items-center mt-4 justify-center px-7'>
      <div className='lg:w-96 sm:w-64 border rounded-3xl px-7 py-10 bg-white/90'>

        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7 text-center'>Login</h4>
          <input type='text' placeholder='Email' className='input-box bg-white'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 text-xs pb-3'>{error}</p>}


          <button type='submit' className='btn-primary'>Login</button>
          <p className='text-sm mt-4 text-center'>Not Registered?{" "}<Link to="/signup" className="underline font-medium text-blue-600">Sign Up</Link></p>
        </form>  

      </div>
    </div>

    </>
  );
};

export default Login
