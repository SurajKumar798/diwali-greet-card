import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Cookies from 'js-cookie';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import './LoginComponent.css';

function LoginComponent(){
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const navigate = useNavigate();
  
     const [value, setValue] = useState({
         email: "",
         password: "",
     });
     const handleChange = (prop)=> (event) =>{
        setValue({...value, [prop]: event.target.value});
     }
    const handleSubmit = (e) =>{
        e.preventDefault();
         console.log("email",value.email);
         console.log("password", value.password);
        
         if(!value.email || !value.password){
          alert("please fill up the form");
          return;
         }
        axios.post(`${apiUrl}/${apiVersion}/user/login`,
            {
                email: value.email,
                password: value.password,
            },
            {withCredentials: true},
            {
                 headers: {
                   "Content-Type": "application/json",
              },
            }
        )
        .then((response)=>{
            console.log(response.data);
            if(response.data.token){
              Cookies.set('token', response.data.token, {expires: 7});
              navigate('/home');
            }
        })
        .catch((err)=>{
          console.log("Error", err);
          if(err.response && err.response.data && err.response.data.message){
            alert(err.response.data.message);
          }else{
            alert("invalid email or password");
          }
        });
    };
    return (
      <>
         <HeaderComponent />
        <Stack spacing={3}>
            <h1>Login Page</h1>
          <form onSubmit={(e) =>handleSubmit(e)}>
            <TextField
              id="outlined-basic"
              label="Email" 
              variant="outlined"
              onChange={handleChange('email')} 
              sx={{ width: '600px' }}
            />
            <TextField 
               id="outlined-basic" 
               label="Password"
               variant="outlined" 
               onChange={handleChange('password')} 
               sx={{ width: '600px' }}
            />

            <Button variant="contained" type="submit" sx={{ fontSize: '20px', backgroundColor: '#f5d906', fontFamily: 'serif' }}>
              Login
            </Button>
          </form>
        </Stack>
      </>
     
    )
}

export default LoginComponent;