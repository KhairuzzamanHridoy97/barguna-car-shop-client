import React, { useState } from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import login from '../../../images/login/login.png';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Register = () => {

    const [loginData,setLoginData] = useState({});

    const handleOnSubmit=(e)=>{
        if(loginData.password !== loginData.password2){
            alert('Password Not Matched');
            return 
        }
       
        e.preventDefault();
    }

    const handleOnChange =(e)=>{
        const field = e.target.name;
        const value= e.target.value;
        const newLoginData= {...loginData};
        newLoginData[field]=value;
        setLoginData(newLoginData);
        // console.log(field,value)
    }
    
    return (
        <>
        <Navigation></Navigation>
            <Container> 
                <Grid container sx={{my:4}}  spacing={2}>
                    <Grid item xs={12} md={6}>
                    <Typography variant="h4"  gutterBottom component="div">
                        Register Here
                    </Typography>
                    <form onSubmit={handleOnSubmit}>
                        <TextField 
                        sx={{width:'75%',m:1}}
                        id="standard-basic" 
                        label="Name"
                        type="text"
                        name='name'
                        onChange={handleOnChange} 
                        variant="standard" 
                        />
                        <TextField 
                        sx={{width:'75%',m:1}}
                        id="standard-basic" 
                        label="Email"
                        type="email"
                        name='email'
                        onChange={handleOnChange} 
                        variant="standard" 
                        />
                        <TextField 
                        sx={{width:'75%',m:1}}
                        id="standard-basic" 
                        label="Password"
                        type="password"
                        name='password'
                        onChange={handleOnChange}  
                        variant="standard" 
                        />
                        <TextField 
                        sx={{width:'75%',m:1}}
                        id="standard-basic" 
                        label="Retype Password"
                        type="password"
                        name='password2'
                        onChange={handleOnChange}  
                        variant="standard" 
                        />
                        <Button type='submit' sx={{width:'75%',m:1}} variant='contained'>Submit</Button>
                        <NavLink to='/login' style={{textDecoration:'none'}}>
                          <Button  variant='text'>Already Registered! Login Here</Button>
                        </NavLink>
                    </form>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <img style={{width:"100%"}} src={login} alt="" />
                    </Grid>
            
                </Grid>
            </Container>
        </>
    );
};

export default Register;