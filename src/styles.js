import { makeStyles } from "@material-ui/core/styles";
/*
1. Create a hook called useStyles
2. useStyles = function call of makeStyles
3. makeStyles has a callback function ()=>{...
4. callback f. returnes an object with all the styles
+ (theme)=>...
is optional, it offers more styling options 

Material UI is using this CSS in JS syntax
 */


const useStyles = makeStyles({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      },


    btn: {
        fontSize: 23,
       // backgroundColor:"#ffc107",
        '&:hover' : {
            backgroundColor: '#ff8f00',
        },
        marginTop:35
    },

    popup_box: {
        marginBottom: 20,
        marginTop: 20,
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        backgroundColor:"#fffffff",

    },

    text: {
        fontWeight: 'bold',
        marginBottom: 1,
        align: "center"
    },

    text_second: {
        fontStyle: 'italic',
        marginBottom: 15,
        align: "center"
    },

    text_account: {
        fontWeight: 'bold',
        marginBottom: 1,
        align: "center",
        color:"#eeeeee"
    },
    
    field: {
        marginBottom: 20,
        marginTop: 20,
        textAlign:"center",
        /*
        '&:hover' : {
            backgroundColor: '#eeeeee',
        },*/

    },

    // ------------Login------------
    container_login: {
        
        display: "flex", 
      //  justifyContent: "center",
     //   alignItems:"stretch",
     alignSelf:"center",

        marginTop:100,

        color: "#4f4f4f",

        backgroundColor:"#eeeeee",
        boxShadow:"3px 3px 1px black"
    },

    container: {
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"stretch",
        alignContent:"center",

        textAlign:"center",
        marginTop:100, 

        //padding:50,
        paddingBottom:50, 
        paddingTop:25,
        paddingLeft:50,
        paddingRight:50,
    },

    container_create_account: {
        display:"grid",
        placeItems:"center",

//        flexFlow:"center",
  //      justifyContent:"center",
    //    alignItems:"stretch",
      //  alignContent:"center",

        textAlign:"center",
       // marginTop:100, 

        //padding:50,
        paddingBottom:50, 
        paddingTop:25,
        paddingLeft:50,
        paddingRight:50,

    },
//-----------------------------------
//------------REGISTER---------------
    container_register: {

        display:"grid",
        placeItems:"center",
        
        /*
        flexFlow:"center",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",*/

        textAlign:"center",
        marginTop:100, 

        //padding:50,
        paddingBottom:50, 
        paddingTop:25,
        paddingLeft:50,
        paddingRight:50,

        backgroundColor:"#eeeeee",
        boxShadow:"4px 4px 1px black"
    },
//-----------------------------------
//------------HOME-------------------
main_view: {
    display:"flex",
   // placeItems:"center",
    alignItems:"stretch",
    alignContent:"stretch",
    flexDirection:"row",

    minHeight:"100vh",
   // width:"100%",

    margin:0,
    padding: 0,

    //backgroundColor:"blue",

    overflow: "hidden", /* Hide scrollbars */
    overflowY: "hidden", /* Hide vertical scrollbar */
    overflowX: "hidden", /* Hide horizontal scrollbar */

},

left_menu_view: {
    display:"flex",
    
    justifyContent:"flex-start",
    alignItems:"flex-start",
    //alignContent:"stretch",
   // placeItems:"center",
    flexDirection:"column",
    //alignSelf:"flex-end",
    //height: "100%",

   // backgroundColor:"green",

    

},

top_left_view: {
    minWidth:"100%",
    flexDirection:"row",
    backgroundColor:"#3d3d3d",
    
    //dividers
    borderRight: "3px solid black",
    borderBottom: "3px solid black",
},

bottom_left_view: {
    minWidth:"100%",
    backgroundColor:"#3d3d3d",
    color: "white",
    // alignItems:"flex-start",
    // justifyContent:"flex-start",
    alignSelf:"flex-start",
    maxHeight: '70vh', 
    minHeight:"60em",
    //dividers
    borderRight: "3px solid black",
    borderBottom: "3px solid black",

},

right_view: {
    backgroundColor:"#3d3d3d",
   // maxHeight: '10vh', 

},
right_view_messages:{
    overflow:"hidden", 
  //  overflowY:"scroll",
 //   height:"200"
},


btn_logout: {
    fontSize: 13,
    backgroundColor:"#d40000",//red
    '&:hover' : {
        backgroundColor: '#b50000',
    },
    marginTop:25,
    marginLeft:20,
},

btn_settings: {
    color:"grey",
    marginTop:25,
   // alignSelf:"felx-end"
},



field_search: {
    minWidth:"70%",
    marginBottom: 20,
    marginTop: 20,
    marginLeft:20,
    textAlign:"center",
    color:"blue",
    
    '&:hover' : {
        backgroundColor: '#3b3b3b',
        color:"blue"
    },
    '&:placeholder' : {
        color:"white",
    },
},
//search advenced css
//----------
input: {
    color: "white"
  },
  cssLabel: {
    color : 'white'
  },
//---------
btn_add: {
    marginTop:30,
    marginLeft:20
},

message_div: {
    //flexDirection:"row",


},
message_textfield: {

    position: "fixed",
    bottom: 0,
    right: 0,

    margin: 8,

    backgroundColor:"#1c1c1c",
    maxWidth:"74%",
    border: "1px solid #806104",
    '&:hover' : {
        backgroundColor: '#242424',
    },

},

message_btn: {
    position: "fixed",
    bottom: 0,
    right: 0,

    margin: 12,

},




active: {
    background: '#404040'
},

/**Settings: */
settings_title_div: {
    backgroundColor:"#ffc107",
},
settings_title: {
     marginLeft:25
},
user_item: {
    marginTop:20
},
user_button:{
    marginLeft: 45,
    color:"#ff8a65",
    borderColor:"#ff8a65",
    '&:disabled': {
        color:"#6f7373",
        borderColor:"#6f7373",
     },
},
user_button_unblock:{
    marginLeft: 45,
    color:"#1398c2",
    borderColor:"#1398c2",
    '&:disabled': {
        color:"#6f7373",
        borderColor:"#6f7373",
     },
},

});
export default useStyles;