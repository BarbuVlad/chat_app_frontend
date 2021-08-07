
import { Button, GridList, GridListTile, TextField, Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import {useState} from "react";

import useStyles from '../styles';
const User = ({user}) => {
    const classes = useStyles();
    const [value, setValue] = useState(false);//force an update 


    const handleBlockUnblock = async () => {
        try{
        let action = "block";
        user.blocked ? action="unblock" : action="block";
        const block_unblock_fetch = await fetch(`http://192.168.206.129:5000/api/users/block_action?action=${action}`,{
            method:"PATCH",
            headers:{"Content-type":"application/json","x-auth-token":localStorage.getItem("token")},
            body:JSON.stringify({"user_id":user._id})
        });
        const data = await block_unblock_fetch.json();
console.log("block action: ", data);
        if(data["code"]==0){
            user.blocked = !user.blocked;
            setValue(!value);

        } else{
            alert("Error occurred. ERROR: ", data["message"]);
        }
    } catch(err){
        alert("Error at network fetch...");
    }

    }
    return (
    
        <div className={classes.user_item}>
            <div style={{display:"flex", flexDirection:"row", marginBottom:15}}>
            
                <Typography variant="h4">{user.name}</Typography>
                
                { user.isAdmin ? /*True->can't ban     False-can ban*/
                <Tooltip title="Operation not possible on admin user! Contact it ops team">
                    <span>
                <Button variant="outlined" size="medium" disableElevation className={classes.user_button} disabled>
                    {user.blocked ? "Unblock" : "Block"}
                </Button>
                </span>
                </Tooltip>
                :
                <Button variant="outlined" size="medium" 
                disableElevation 
                className={user.blocked ? classes.user_button_unblock : classes.user_button}
                onClick={handleBlockUnblock}>
                   {user.blocked ? "Unblock" : "Block"}
                </Button>
                
                }

            </div>
            
                <div style={{marginLeft:10}}>
                <Typography variant="body1">Id: {user._id}</Typography>
                <Typography variant="body1">Bocked: {user.blocked ? "true" : "false"}</Typography>
                <Typography variant="body1">Admin: {user.isAdmin ? "true" : "false"}</Typography>
                </div>
                <Divider />
        </div>
        
        
    
    )
}

export default User;
