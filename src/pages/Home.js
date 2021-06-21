import { Button, GridList, GridListTile, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {useState, useEffect} from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';

import SettingsIcon from '@material-ui/icons/Settings';

import useStyles from '../styles';
import Contact from "../components/Contact";
import ChatMessage from '../components/ChatMessage';
import useInterval from "../components/_useInterval";
import DialogBox from "../components/DialogBox";
const Home = () => {

    const selected = "Alex";
    const conversation = [{user:"Alex", message:"Hello", time:"21 April 14:55"},
    {user:"Vlad", message:"Hello Alex!", time:"21 April 14:56"},
    {user:"Vlad", message:"What time are you free?", time:"21 April 14:56"},
    {user:"Alex", message:"Around 7 p.m.", time:"21 April 14:59"},
    {user:"Alex", message:"orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus, dui mattis euismod rutrum, velit elit suscipit urna, ac elementum orci felis vulputate lacus. Maecenas ultrices dolor pulvinar, scele", time:"21 April 14:59"},
    {user:"Alex", message:"orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus, dui mattis euismod rutrum, velit elit suscipit urna, ac elementum orci felis vulputate lacus. Maecenas ultrices dolor pulvinar, scele", time:"21 April 14:59"},
    {user:"Alex", message:"orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus, dui mattis euismod rutrum, velit elit suscipit urna, ac elementum orci felis vulputate lacus. Maecenas ultrices dolor pulvinar, scele", time:"21 April 14:59"},
    {user:"Alex", message:"orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus, dui mattis euismod rutrum, velit elit suscipit urna, ac elementum orci felis vulputate lacus. Maecenas ultrices dolor pulvinar, scele", time:"21 April 14:59"},
    {user:"Alex", message:"orem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus, dui mattis euismod rutrum, velit elit suscipit urna, ac elementum orci felis vulputate lacus. Maecenas ultrices dolor pulvinar, scele", time:"21 April 14:59"},
  ]
    const contacts = [
      {name:"Alex", id:0},
      {name:"Bogdan", id:1},
      {name:"Andreea", id:2},
      {name:"Jason", id:3},
      {name:"Maria", id:4},
      {name:"Alex", id:5},
      {name:"Bogdan", id:6},
      {name:"Andreea", id:7},
      {name:"Jason", id:8},
      {name:"Maria", id:9},

    ];
    const [openLogout, setOpenLogout] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [usernameSearch, setUsernameSearch] = useState(``);

    const classes = useStyles();
    const history = useHistory();
    /*Handlers */
    const handleLogoutClick = () => {
      setOpenLogout(true);

    }

    const handleCloseLogout = () => {
      setOpenLogout(false);
    };

    const handleOpenAdd = () => {
      setOpenAdd(!openAdd);
    };
    const handleConfirmLogout = () => { ///< logs out the user
      setOpenLogout(false);
      localStorage.setItem("token", null);
      history.push("/");
    };
    
    useInterval(()=>{
      //console.log(`\nToken: ${localStorage.getItem("token")}\n`);
      if(localStorage.getItem("token")=='null'){
        console.log("Session expired! Redirect to login...");
        history.push("/");//push to login
      }
      return function stopSession(){
        console.log("Stopping session (cleanup routine)...");
        localStorage.setItem("token", null);
      }
  }, 2000);

    return (
        <Grid container spacing={0} className={classes.main_view}>

        {/* ===Left menus=== */}
        <Grid container item xs={4} className={classes.left_menu_view} spacing={0} >
            
            {/* Top left view */}
            <Grid item xs={2} className={classes.top_left_view} > 
           
            
            <Button                    
            className={classes.btn_logout}
            variant="contained"
            onClick={handleLogoutClick}
            >
                <b>Logout</b></Button>
            {/* ==== Logout confirmation dialog ===*/}
              <Dialog
              open={openLogout}
              onClose={handleCloseLogout}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <div style={{backgroundColor:"#3d3d3d", color: "white", textAlign:"center"}}>
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to logout?"}</DialogTitle>
              <DialogContent >
              </DialogContent>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <DialogActions>
                    <Button onClick={handleConfirmLogout} color="primary">
                      <b>YES I'M SURE</b>
                    </Button>
                    <Button onClick={handleCloseLogout} color="primary">
                      NOT YET
                    </Button>
                  </DialogActions>
                </div>
              </div>
            </Dialog>
            {/* ==== -------------------- ===*/}

            
            <IconButton className={classes.btn_settings}>
            <SettingsIcon/>
            </IconButton>

           <div style={{flexDirection:"row"}}>
            <TextField 
                onChange={(e) => setUsernameSearch(e.target.value)}
                className={classes.field_search}
                label="Search user..."
                variant="standard"
                error={false}
                InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                />

            <Button
            className={classes.btn_add}                    
            variant="contained"
            color="primary"
            onClick={()=>{setOpenAdd(true)}}
            >add</Button>
            </div>
            <DialogBox username={usernameSearch} open={openAdd} openHandle={handleOpenAdd}/>
            </Grid>
            

            {/* Bottmom left view */}
            <Grid item xs={10} className={classes.bottom_left_view}>
            <List>
                        {contacts.map(contact => (
                          <Contact key={contact.id} contact={contact}/>

                        ))}
                    </List>

            </Grid>

            {/*Container of menus */}
         </Grid>
        {/* ================ */}
            {/* Right view */}
            <Grid item xs={8} className={classes.right_view}>
              <nav className={classes.right_view_messages}>
              {conversation.map((message)=>(
                <ChatMessage message={message} 
                owner={message.user==="Vlad" ? true : false}/>
              ))}
              </nav>
            </Grid>
            
        </Grid>
    )
}

export default Home;
//<Grid container className={classes.left_menu_view} spacing={0}>