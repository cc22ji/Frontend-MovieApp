
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const backendUrl = process.env.BACKEND_BASE_URL || "https://movieapp-backend-x3ry.onrender.com"
const SignUpURL = `${backendUrl}/signup`


function Signup(){

  const naviagte = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirm_Password] = useState("")
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)

  function handleNameChange(e){
    setName(e.target.value)
  }

  function handleEmailChange(e){
      setEmail(e.target.value)
  }

  function handlePasswordChange(e){
      setPassword(e.target.value)
  }

  function handleConfirmPasswordChange(e){
    setConfirm_Password(e.target.value)
  }

  async function handleFormSubmit(e){
      e.preventDefault();

      const SignupData = {
          name : name,
          email:email,
          password:password,
          confirm_password : confirm_password
      }
      try {
          const response = await fetch(SignUpURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( SignupData ),
          });
    
          const result = await response.json();
          if(result.status === "Success"){
              setSuccess(result.message || "singup Succcessfully")
              setError(null)
              setShow(true)
              naviagte("/login");
              setEmail("")
              setPassword("")
          }else{
             
              setError(result.message || "Login Failed")
              
              setSuccess(null)
              
          }
        } catch (error) {
          setError(error || "Unable to Login")
        }

  }
    return(
        <div className="bg-slate-900">
        <div class="flex flex-col items-center justify-center h-screen dark">
  <div class="w-full max-w-md bg-slate-800 rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-200 mb-4">SignUp</h2>
    <form class="flex flex-col">
      <input placeholder="User Name" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="name" value={name} onChange={handleNameChange} name="name" required/>
      <input placeholder="Email address" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" value={email} onChange={handleEmailChange} name="email" required/>
      <input placeholder="Password" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" value={password} onChange={handlePasswordChange} name="password" required/>
      <input placeholder="Confirm_Password" class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" value={confirm_password} onChange={handleConfirmPasswordChange} name="confirm_password" required/>
      {
        (show===true)?(<p className="mb-2 text-green-600 text-center italic">{success}</p>):(<p className="mb-2 text-red-600 text-center italic">{error}</p>)
      }
      <div class="flex items-center justify-between flex-wrap">
        
        
        <p class="text-white mt-"> Already have an account? <a class="text-sm text-blue-500 -200 hover:underline mt-4" href="/login">Login</a></p>
      </div>
      <button class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md mt-4  hover:to-blue-600 transition ease-in-out duration-150" type="submit" onClick={handleFormSubmit}>SignUp</button>
    </form>
  </div>
</div>
</div>

    )
}

export default Signup