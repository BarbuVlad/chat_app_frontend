import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import AccountBoxIcon from '@material-ui/icons/AccountBox';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useEffect, useState } from "react";

import { useHistory } from 'react-router-dom';

import useStyles from '../styles';
import { useDispatch, useSelector } from 'react-redux';
//import { setJwt } from "../redux/jwtSlice";

import {withStyles} from '@material-ui/core/styles';

const Login = () => {
//states and variabiles
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [nameError, setNameError] = useState(false);
const [passwordError, setPasswordError] = useState(false);
//redux states
//const jwt = useSelector((state)=>state.jwt);
//const dispatch = useDispatch();

//Other states
const [loginFail, setLoginFail] = useState(false);
const [popupText, setPopupText] = useState('');
const [popupTitle, setPopupTitle] = useState(`Successfull`);
const [openLogin, setOpenLogin] = useState(false);


const history = useHistory();
const classes = useStyles();

//handlers
const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setNameError(false);
    setPasswordError(false);
    if (name === '') {setNameError(true); return}
    if (password === '') {setPasswordError(true); return;}
    //validate

    console.log(name, password);
    //fetch login from server
    
    try{
    const login_result  = await   fetch('http://192.168.206.129:5000/api/users/login', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({name, password})
    });

    const data = await login_result.json();

    if(data["code"]==1 || data["code"]==2){ //invalid data
        setLoginFail(true);
        setPopupText("Error occured, please try again!");
        setPopupTitle("Error");
        setOpenLogin(true);
        return;
    }
    if(data["code"]==0){//success
        setLoginFail(false);
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("username", data["username"]);
        localStorage.setItem("id", data["id"]);
        console.log(data);
        history.push("/home")
        return;
    }
    } catch(err){
        setLoginFail(true);
        setPopupText(`Server or network error. Try again!`);
        setPopupTitle("Error");
        setOpenLogin(true);
        return;
    }


    // console.log(data);

}
const handleCloseLogin = () => {
    setOpenLogin(false);
};

    return (
        <Container maxWidth="md">
        <Grid container
       // justify="center"
        className={classes.container_login}>
        <Grid item xs={6} xl={6} className={classes.container}>
            
                <Typography variant="h4" className={classes.text}>
                    Welcome back!
                </Typography>
                <Typography variant="h6" className={classes.text_second}>
                    Login and let's get started.
                </Typography>
    
            <form noValidate autoComplete="off" onSubmit={handleLoginSubmit}>
                <TextField
                onChange={(e) => setName(e.target.value)}
                className={classes.field}
                label="NAME"
                variant="outlined"
                fullWidth
                required
                error={nameError}
                />
    
                <TextField 
                onChange={(e) => setPassword(e.target.value)}
                className={classes.field}
                label="PASSWORD"
                type="password"
                variant="outlined"
                fullWidth
                required
                error={passwordError}
                />
    
                <Button 
                    className={classes.btn}
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                > 
                    Login
                </Button>
            </form>

                                {/* ==== Register result dialog ===*/}
                                <Dialog
              open={openLogin}
              onClose={handleCloseLogin}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
            
              <div style={{backgroundColor:"#3d3d3d", color: loginFail?"#d45559":"#9bdb5a", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{popupTitle}</DialogTitle>
              <DialogContent style={{color:"white"}}>
                  {popupText}   
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
                  <DialogActions>
                    <Button onClick={handleCloseLogin} color="primary">
                      OK
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* ==== -------------------- ===*/}
    
            
            </Grid> {/*grid item 1 - login page */ }

            <Grid item xs={0.1}>  
            <Divider orientation="vertical" />
            </Grid>
    
            <Grid item xs={5} xl={5} className={classes.container_create_account}>
                
    
                <div>
                    <AccountBoxIcon color="primary" style={{ fontSize: 65, marginTop: 1 }}/>
                    <Typography>
                            <Link href="/register" onClick={console.log("")}>
                               <b> Register here! </b>
                            </Link>
                    </Typography>
                </div>
                
            </Grid>
    
            </Grid> 
            </Container>
        )
}

export default Login;
