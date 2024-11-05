// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import styled from 'styled-components'
// import Logo from "../assets/logo.svg"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { registerRoute } from '../utils/APIRoutes';


// function Register() {

//     const [values, setValues] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     })

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if(handleValidation()){
//             const {username, email, password, confirmPassword} = values;
//             const {data} = axios.post(registerRoute, {
//                 username,
//                 email,
//                 password,
//             })
//         }
//         alert("User registered")
//     }

//     const toastOptions = {
//         position: "bottom-right",
//         autoClose: 8000,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//     }

//     const handleValidation = () => {
//         const {password, confirmPassword, username, email} = values;
//         if(password !== confirmPassword){
//             toast.error("Passwords do not match", toastOptions);
//             return false;
//         } else if(username.length < 3){
//             toast.error("Username should be at least 3 characters", toastOptions);
//             return false;
//         } else if(password.length < 8){
//             toast.error("Password should be at least 8 characters", toastOptions);
//             return false;
//         } else if(!email.includes("@")){
//             toast.error("Email is not valid", toastOptions);
//             return false;
//         }

//     }

//     const handleChange = (e) => {
//         e.preventDefault();
//         setValues({...values, [e.target.name]: e.target.value})
//     }
// return (
//     <>
//     <FormContainer>
//         <form onSubmit={(e) => handleSubmit(e)}>
//             <div className="brand">
//                 <img src={Logo} alt="" />
//                 <h1>Snappy</h1>
//             </div>
//             <input
//             type="text"
//             name='username'
//             placeholder='Username'
//             onChange={(e) => handleChange(e)}
//             />
//             <input 
//             type="email" 
//             name="email" 
//             placeholder='Email'
//             onChange={(e) => handleChange(e)} />
//             <input 
//             type="password" 
//             name="password" 
//             placeholder='Password'
//             onChange={(e) => handleChange(e)} />
//             <input 
//             type="password" 
//             name="confirmPassword" 
//             placeholder='Confirm Password'
//             onChange={(e) => handleChange(e)} />
//             <button type="submit">Create User</button>
//             <span>Already have an account ? <Link to= '/login'>Login</Link></span>
//         </form>
//     </FormContainer>
//     <ToastContainer />
//     </>
// )
// }

// const FormContainer = styled.div`
//     height: 100vh;
//     width: 100vw;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     gap: 1rem;
//     align-items: center;
//     background-color: #131324;
//     .brand{
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         justify-content: center;
//     }
//     img{
//         height: 5rem;
//     }
//     h1{
//         color: white;
//         text-transform: uppercase;
//     }
//     form{
//         display: flex;
//         flex-direction: column;
//         gap: 2rem;
//         background-color: #00000076;
//         border-radius: 2rem;
//         padding: 3rem 5rem;
//     }
//     input{
//         background-color: transparent;
//         padding: 1rem;
//         border: 0.5rem solid #4e0eff
//         border-radius: 0.4rem;
//         color: white;
//         width: 100%;
//         font-size: 1rem;
//         &:focus {
//             border: 0.1rem solid #997af0;
//             outline: none
//         }
//     }
//     button {
//         background-color: #997af0;
//         color: white;
//         padding: 1rem 2rem;
//         border: none;
//         font-weight: bold;
//         cursor: pointer;
//         border-radius: 0.4rem;
//         font-size: 1rem;
//         text-transform: uppercase;
//         transition: 0.5sec ease-in-out;
//         &:focus {
//             background-color: #4e0eff;
//         }
//     }
//     span {
//         color: white;
//         text-transform: uppercase;
//         a {
//             color: #4e0eff;
//             text-decoration: none;
//             font-weight: bold;
//         }
//     }
// `;

// export default Register

import React, { useState , useEffect } from 'react'
import { Box } from '@mui/material'
import logo from '../assets/logo.svg'
import { Link , useNavigate } from 'react-router-dom'
import { ToastContainer , toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerAPI } from '../APIs'

const Register = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")


  const toastOptions = {
    position : 'bottom-right' , 
    autoClose: 8000 ,
    pauseOnHover: true ,
    draggable: true ,
    theme: 'dark',
  }
  useEffect(()=>{
    if(localStorage.getItem("Chat-APP-USER")){
      navigate("/")
    }
},[navigate])

  const submitValidation = ()=>{
   if(username.length <=3){
    toast.error("Username Length Should Be Greater Than 3." , toastOptions)
   return false;

 }
 else if(email.length <=6){
  toast.error("Enter a Valid Email Address." , toastOptions)
 return false;

}
else if(password.length < 8){
  toast.error("Password Length Should Be Atleast 8." , toastOptions)
 return false;
 
}
   else if(password !== confirmPassword){
    toast.error("Password and Confirm Password Should Be Same." , toastOptions)
    
     return false;
    }
      
   return true;
}  

const HandleSubmit = async (e)=>{
  e.preventDefault();
  
  if(submitValidation()){
    const { data } = await axios.post(registerAPI, {
      username,
      email,
      password,
    })
    if(data.status === false){
        toast.error(data.msg , toastOptions)
    }
    if(data.status === true){
      localStorage.setItem("Chat-APP-USER" ,JSON.stringify(data.user));
       navigate("/setAvatar")
    }
}


}

return (
    <div style={{color:'white', overflowY: 'scroll'}}>
    <Box display='flex' justifyContent='center' alignItems='center'  sx={{background: ' #1c1b2e', height:'100vh' , width: '100vw'}}>
    <form style={{display:'flex' , flexDirection:'column' , gap: '25px' , background: ' #0c1b1e' , border: '1px solid white' , padding:'40px 20px' }} onSubmit={(e)=>HandleSubmit(e)}>
        <img src={logo} alt="Logo" width='60%' />
        <input type="text" name='username' placeholder='Username' style={{padding:'14px' , background: 'transparent' , color:'white' , border:'1px solid white' , outline:'none'}} onChange={(e)=>setUsername(e.target.value)} />
        <input type="email" name='email' placeholder='Email' style={{padding:'14px' , background: 'transparent' , color:'white' , border:'1px solid white' , outline:'none'}} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name='password' placeholder='Password' style={{padding:'14px' , background: 'transparent' , color:'white' , border:'1px solid white' , outline:'none'}} onChange={(e)=>setPassword(e.target.value)} />
        <input type="password" name='confirmPassword' placeholder='Confirm Password' style={{padding:'14px' , background: 'transparent' , color:'white' , border:'1px solid white' , outline:'none'}} onChange={(e)=>setConfirmPassword(e.target.value)} />
        <button type='submit' style={{background:'transparent' , color:'white' , padding:'8px' , border:'1px solid white' , cursor:'pointer'}}>Register</button>

        <span style={{color:'white' , textAlign:'center'}}>Already Have an Account? <Link to='/login' style={{textDecoration:'none'}}>Login</Link> </span>

    </form>
    
    </Box>
    <ToastContainer/>
    </div>
  )
}

export default Register
