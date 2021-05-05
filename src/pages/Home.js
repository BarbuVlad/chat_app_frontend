import { Button, GridList, GridListTile, TextField, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import Divider from "@material-ui/core/Divider";
import IconButton from '@material-ui/core/IconButton';

import SettingsIcon from '@material-ui/icons/Settings';

import useStyles from '../styles';
import Contact from "../components/Contact";
import ChatMessage from '../components/ChatMessage';
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

    ];

    const classes = useStyles();
    return (
        <Grid container spacing={0} className={classes.main_view}>

        {/* ===Left menus=== */}
        <Grid container item xs={4} className={classes.left_menu_view} spacing={0} >
            
            {/* Top left view */}
            <Grid item xs={2} className={classes.top_left_view} > 
           
           
            <Button                    
            className={classes.btn_logout}
            variant="contained">
                <b>Logout</b></Button>
            
            <IconButton className={classes.btn_settings}>
            <SettingsIcon/>
            </IconButton>

           <div style={{flexDirection:"row"}}>
            <TextField 
                onChange={()=>{}}
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
            onClick={()=>{console.log("ADD")}}
            >add</Button>
            </div>

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