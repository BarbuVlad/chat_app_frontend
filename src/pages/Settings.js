
import useInterval from "../components/_useInterval";
import { useHistory } from 'react-router-dom';
import { Typography } from "@material-ui/core";

import useStyles from '../styles';
import User from '../components/User';
import {useState, useEffect} from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
const Settings = () => {
    
    const classes = useStyles();
    const history = useHistory();

    const[users, setUsers] = useState('No users fetched');

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
        const fetchUsers = async () => {
          try{
            /*Get  contacts, pending_contacts, invites and format_lists=true (insert the username for that contact)*/
          const users_fetch = await fetch(`http://192.168.206.129:5000/api/users`, {
            method: 'GET',
            headers: {"Content-type": "application/json",
                        "x-auth-token": localStorage.getItem("token")
                        }
        });
        const data = await users_fetch.json(); 
        if(data["code"]!==0){
          //alert("Can't fetch contacts. Network error!");
          setUsers(data["message"]);
          return;
        }
        setUsers(data["message"]);
        console.log(data["message"]);
        } catch(err){
          alert("Error occurred at fetching contact data...");
          console.log(err);
        }
        
      }
      fetchUsers();
    
      }, []);
    return (
        <>
        <div className={classes.settings_title_div}>
            <h1 className={classes.settings_title}>User management {typeof(users) === "object" ? `(${users.length} fetched)` : ""}</h1>
        </div>
        { typeof(users) === "object" ?
        <nav style={{color:"white", margin:15}}>
              {users.map((user)=>(
                <User user={user} 
                />
              ))}
        </nav>
        :
        <Typography variant="h5" style={{color:"white", margin:15}}>
            {users}
        </Typography>

         }
        </>
    )
}

export default Settings;
