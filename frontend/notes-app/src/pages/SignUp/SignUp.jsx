import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';


const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your Name");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter a password");
      return;
    }

    setError("");

    //signup API call
    try{
      const response = await axiosInstance.post("./create-account",{
        fullName: name,
        email: email,
        password: password,
      });
  
      //handle successfull signup
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    } catch (error){
      //handle login error
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Pleas try again.");
      }
    }
  };

  return (
    <>
    

    <div className='flex items-center mt-28 justify-center'>
      <div className='lg:w-96 sm:w-64 border rounded-3xl px-7 py-10 bg-white'>
        <form onSubmit={handleSignUp}>
          <h4 className='text-2xl mb-7 text-center'>Sign Up</h4>

          <input 
          type='text' 
          placeholder='Name' 
          className='input-box'
          value={name}
          onChange={(e) => setName(e.target.value)}
          />

          <input 
          type='text' 
          placeholder='Email' 
          className='input-box'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-xs pb-3'>{error}</p>}


          <button type='submit' className='btn-primary'>Create Account</button>
          <p className='text-sm mt-4 text-center'>
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium text-blue-600">
            Login
            </Link>
            </p>

        </form>
      </div>
    </div>
    </>
  );
};

export default SignUp;
