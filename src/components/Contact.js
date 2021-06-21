import ListItem from "@material-ui/core/ListItem";
//import ListItemText from "@material-ui/core/ListItemText";
//import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";

import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { makeStyles } from "@material-ui/core/styles";
//import { Typography } from "@material-ui/core";


const useStyles = makeStyles({
    active: { 
        background: '#404040',
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
        justifyContent:"center",
        alignItems:"center",
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

    const selected = "Alex";

    const classes = useStyles();
    return (

    <ListItem
    divider
    className={classes.item}
    >
    <Button
    className={selected == contact.name ?
        classes.active : classes.not_active}
    size="large"
    variant="outlined"
    ><b>{contact.name}</b></Button>
    
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

    </ListItem>

    )
}

export default Contact;
