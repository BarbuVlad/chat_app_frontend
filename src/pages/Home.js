import { Button, GridList, GridListTile, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import {useState, useEffect, useRef} from "react";

import List from "@material-ui/core/List";

import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';

import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';

import useStyles from '../styles';
import Contact from "../components/Contact";
import ChatMessage from '../components/ChatMessage';
import useInterval from "../components/_useInterval";
import DialogBox from "../components/DialogBox";
//import { Alarm } from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import {setSelected} from '../redux/SelectedSlice';
import {setConversation, addToConversation} from '../redux/ConversationSlice';

//import { io } from "socket.io-client";
import socketIOClient from "socket.io-client";

const Home = () => {

    const [openLogout, setOpenLogout] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [usernameSearch, setUsernameSearch] = useState(``);
    const [message, setMessage] = useState(``);
    //Contacts states:
    const [contacts, setContacts] = useState([]);
    const [invites, setInvites] = useState([]);
    const [pendingContacts, setPendingContacts] = useState([]);

    //const [selected, setSelected] = useState(null);
    const selected = useSelector((state) => state.selected);
    const conversation = useSelector((state) => state.conversation);
    const dispatch = useDispatch();
    //dispatch(set())
    // const [reRender, setReRender] = useState(0);

    const classes = useStyles();
    const history = useHistory();

    const socket = useRef();
    //const [socket, setSocket] = useState();

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
      localStorage.setItem("conversation_id", null);
      localStorage.setItem("id", null);
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

  useEffect(()=>{
    const fetchContacts = async () => {
      try{
        /*Get  contacts, pending_contacts, invites and format_lists=true (insert the username for that contact)*/
      const contact_fetch = await fetch(`http://192.168.206.129:5000/api/users/self/?contacts&pending_contacts&invites&format_lists=true`, {
        method: 'GET',
        headers: {"Content-type": "application/json",
                    "x-auth-token": localStorage.getItem("token")
                    }
    });
    const data = await contact_fetch.json(); 
    if(data["code"]!=0){
      alert("Can't fetch contacts. Network error!");
      return;
    }

    let contact_arr = [];
    data["data"]["contacts"].forEach((c)=>{
      c["type"]="contact";
      contact_arr.push(c);
    });

    let invite_arr = [];
    data["data"]["invites"].forEach((i)=>{
      i["type"]="invite";
      invite_arr.push(i);
    });

    let pending_contact_arr = [];
    data["data"]["pending_contacts"].forEach((p)=>{
      p["type"]="pending_contact";
      pending_contact_arr.push(p);
    });
    setContacts(contact_arr);
    setInvites(invite_arr);
    setPendingContacts(pending_contact_arr);

    console.log(contact_arr);
    } catch(err){
      alert("Error occurred at fetching contact data...");
      console.log(err);
    }
    
  }
  fetchContacts();
  // localStorage.setItem("debug"'*');

  //Connect to webSockets server
   socket.current = socketIOClient('ws://192.168.206.129:3001');
  //setSocket(io('ws://192.168.206.129:3001'));
  socket.current.on("connect", () =>{
    console.log(`Websockets connection created with id: ${socket.current.id} `);
  });

  socket.current.on("to_client_message", msg => {
    dispatch(addToConversation(msg));
  
  });

  }, []);

  useEffect(() => {

    

    // return () => {
      
    // }
  });

  useEffect(() => {
    socket.current.emit('join_conversation', localStorage.getItem("conversation_id"))
    console.log("Joined other conv...\n");
  }, [selected]);

  const messageEmitHandler = async () => {
    //{"bot":["Conversation can be started!", moment().format('h:mm a')]}
    //create message 
      const _username = localStorage.getItem("username");
      let today = new Date();
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      let msg = { [_username] : [message, time] };
      //console.log("message to be send: ", msg);
      setMessage('');

      dispatch(addToConversation(msg));
      socket.current.emit("message", msg, localStorage.getItem("conversation_id"));


  }

    return (
        <Grid container spacing={0} className={classes.main_view}>

        {/* ===Left menus=== */}
        <Grid container item xs={3} className={classes.left_menu_view} spacing={0} >
            
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

            
            <IconButton className={classes.btn_settings} onClick={()=>{history.push("/settings")}}>
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
                          <Contact 
                          key={contact.id} 
                          contact={contact}
                          />
                        ))}
                        {invites.map(contact => (
                          <Contact 
                          key={contact.id} 
                          contact={contact}
                          />
                        ))}
                        {pendingContacts.map(contact => (
                          <Contact  
                          key={contact.id} 
                          contact={contact}
                          />
                        ))}
                    </List>

            </Grid>
            {/*Container of menus */}
         </Grid>
        {/* ================ */}
            {/* Right view */}
            <Grid item xs={9} className={classes.right_view}>
              <nav className={classes.right_view_messages}>
              {conversation.map((message)=>(
                <ChatMessage message={message} 
                owner={Object.keys(message)[0]===localStorage.getItem("username") ? true : false}
                ownerName={Object.keys(message)[0]}
                />
              ))}

              </nav>

{   selected!=="" ?
          <div>
              <TextField
              className={classes.message_textfield}
              placeholder="Message"
              fullWidth
              margin="none"
              variant="filled"
              multiline
              rows="1"
              rowsMax="2"

              InputLabelProps={{
                shrink: true,
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              error={false}
              InputProps={{
                  className: classes.input
                }}

                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            <IconButton color="primary" 
            className={classes.message_btn} 
            aria-label="directions"
            onClick={messageEmitHandler}
            >
                <SendIcon />
            </IconButton>
            </div>
    :
    <></>

}



            </Grid>
            
        </Grid>
    )
}

export default Home;
//<Grid container className={classes.left_menu_view} spacing={0}>