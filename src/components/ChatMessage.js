
import { Paper, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
// import { useEffect } from "react";

const useStyles = makeStyles({

    message_contact: {
        backgroundColor:"#5e5e5e",
        color:"white",

        minWidth:"30%",
        maxWidth:"60%",
        
       // display:"flex",
        
       alignSelf:"flex-start",

        margin:10,
        padding:5,

    },

    message_owner: {
        backgroundColor:"#bf6011",
        color:"white",

        minWidth:"30%",
        maxWidth:"60%",
        

        alignSelf:"flex-end",
       // maxWidth:"40%",
       margin:10,
       padding:5
    },

    message_header: {
        display:"flex",
        flexDirection:"row",

        justifyContent:"space-between",
        textAlign:"center"

    },


    name: {
        fontSize:22,
        fontWeight:"bold",


    },

    time: {
        color: "#d1d1d1",
        fontSize:12,
        alignSelf:"center",
        //marginLeft: 20
    },

    text: {
        fontSize:16,
        fontWeight:"normal",
        marginTop:4,
        marginLeft:10
    },



});

const ChatMessage = ({message, owner, ownerName}) => {
/*owner must be either:
    true - message send by current user
    false - message send by contact
*/

    //styles:
    const classes = useStyles();

    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <Paper elevation={2} 
            className={owner ?  classes.message_owner : classes.message_contact}
            >

                <div className={classes.message_header}>
                {/*User name */}
                <Typography variant="h6"
                className={classes.name}>
                    {ownerName}
                </Typography>
                {/*Time */}
                <Typography variant="body1"
                 className={classes.time}>
                    {message[ownerName][1]}
                </Typography>
                </div>
                {/*Message body */}
                <Typography variant="body1" gutterBottom
                 className={classes.text}>
                    {message[ownerName][0]}
                </Typography>



            </Paper>

        </div>
    );
}

export default ChatMessage;
