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

    minHeight:"95vh",
   // width:"100%",

    margin:0,
    padding: 0,

    //backgroundColor:"blue",

    //overflow: "hidden", /* Hide scrollbars */

},

left_menu_view: {
    display:"flex",
   // justifyContent:"flex-start",
    //alignItems:"stretch",
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
    alignSelf:"stretch",

    //dividers
    borderRight: "3px solid black",
    borderBottom: "3px solid black",

},

right_view: {
    backgroundColor:"#3d3d3d",
    
   // maxHeight: '10vh', 


},
right_view_messages:{
   // overflow:"hidden", 
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




active: {
    background: '#404040'
},
    
});
export default useStyles;