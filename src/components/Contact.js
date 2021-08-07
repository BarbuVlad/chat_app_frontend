import ListItem from "@material-ui/core/ListItem";
//import ListItemText from "@material-ui/core/ListItemText";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";

import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import { makeStyles } from "@material-ui/core/styles";
//import { Typography } from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import {setSelected} from '../redux/SelectedSlice';
import {setConversation, addToConversation} from '../redux/ConversationSlice';
import { useState } from "react";

const useStyles = makeStyles({
    active: { 
        background: '#4f4f4f',
        fontSize:20,
        color:"white",
        textAlign: "center",

        width:"100%",
        
    
    },

    not_active: {
        fontSize:20,
        color:"white",
        textAlign: "center",

        width:"100%",
        

    },

    item: {
        display:"flex",
        justifyContent:"flex-start",//center
        alignItems:"flex-start",//center
        flexDirection:"column"
    },

    btn_delete_contact: {
        color:"#dedede",
        alignSelf:"flex-start",

    },

    btn_delete_conversation: {
        color:"#dedede",
        alignSelf:"flex-start",
    },

})

const Contact = ({contact}) => {

   // const selected = "Alex";
   const selected = useSelector((state) => state.selected);
   const conversation = useSelector((state) => state.conversation);
   const dispatch = useDispatch();
   const [_type, set_type] = useState(contact.type);

   const handleSelectEvent = async () =>{
       dispatch(setSelected(contact.username));
       localStorage.setItem("conversation_id", contact.conv_id);
       try{
            const conversation_fetch = await fetch(`http://192.168.206.129:5000/api/conversations/${contact.conv_id}`, {
                method: 'GET',
                headers: {"Content-type": "application/json", "x-auth-token": localStorage.getItem("token")}
            });
            const data = await conversation_fetch.json();
            console.log(data);
            if(data["code"]==0){
                dispatch(setConversation(data["conversation"]));
            }
            
       } catch(err){
           console.log("Error at fetching conversation data");

       }
       console.log(contact);
   }

   const handleAcceptInvite = async () => {
    try{
         const accept_fetch = await fetch(`http://192.168.206.129:5000/api/users/accept_invite`, {
             method: 'PUT',
             headers: {"Content-type": "application/json", "x-auth-token": localStorage.getItem("token")},
             body: JSON.stringify({"inviter_id":contact.contact_id, "conversation_id":contact.conv_id})
         });
         const data = await accept_fetch.json();
         console.log(data);
         if(data["code"]==0){
             set_type("contact");
         }
         else{alert("Error at accepting invite...");}
         
    } catch(err){
        console.log("Error at fetching conversation data");

    }
   }

    const classes = useStyles();
    return (

    <ListItem
    divider
    className={classes.item}
    >
    <Button
    className={selected === contact.username ?
        classes.active : classes.not_active}
    size="large"
    variant="outlined"
    onClick={handleSelectEvent}
    ><b>{contact.username}</b></Button>
    
    {
        _type === "contact" ? 
        <>
        <Button className={classes.btn_delete_conversation}
        startIcon={<DeleteIcon style={{backgroundColor:"#bd4242"}}/>}
        >
            Delete conversation
        </Button>

        <Button className={classes.btn_delete_contact}
        startIcon={<DeleteForeverIcon style={{backgroundColor:"#c40000"}} />}
        >
            Delete contact
        </Button>
        </>

        : <></> /*don't render */
    }
    {
        _type === "invite" ? 
        <>
        <Button className={classes.btn_delete_conversation}
        startIcon={<PersonAddIcon style={{backgroundColor:"#bd8842"}}/>}
        onClick={handleAcceptInvite}
        >
            Accept invite
        </Button>
        </> 

        : <></> /*don't render */
    }
    {
    _type === "pending_contact" ? 
    <>
    <Button className={classes.btn_delete_conversation}
    startIcon={<PersonAddDisabledIcon style={{backgroundColor:"#bd5f42"}}/>}
    >
        Unsend invite
    </Button>
    </> 

    : <></> /*don't render */
    }

    </ListItem>

    )
}

export default Contact;
