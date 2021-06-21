import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {useEffect, useState} from "react";
import Button from  '@material-ui/core/Button';
const DialogBox = ({username, open,openHandle}) => {

    //const [openAdd, setOpenAdd] = useState(open);openHandle
    const [popupText, setPopupText] = useState('Error occurred...');
    const [popupTitle, setPopupTitle] = useState(`Pre-invite fail`);
    //step 1: pre-invite
    const [preInviteResult, setPreInviteResult] = useState(false);
    //step 2: actual invite
    const [inviteResult, setInviteResult] = useState(false);

    const handleClosePopup = () => {
        openHandle(false);
      };

      const handleSendInvite = async () => { 


        //close dialog pop-up
        openHandle(false);
      };

      useEffect(()=>{
        const fetch_pre_invite = async () =>{
            try{
                const login_result  = await   fetch(`http://192.168.206.129:5000/api/users/pre_invite/${username}`, {
                    method: 'GET',
                    headers: {"Content-type": "application/json",
                                "x-auth-token": localStorage.getItem("token")
                                }
                });
                const data = await login_result.json();
                if(data["code"]==0){
                    setPreInviteResult(true);
                    setPopupTitle(`Send invite to ${username}`);
                    setPopupText(data["message"]);
                } else if(data["code"]==1 || 
                            data["code"]==2 || 
                            data["code"]==3 || 
                            data["code"]==4){
                    setPreInviteResult(false);
                    setPopupTitle(`Can't send invite to ${username}!`);
                    setPopupText(data["message"]);
                } else{
                    setPreInviteResult(false);
                    setPopupTitle("Can't send invite!");
                    setPopupText("Error occurred");
                }
                console.log(data);

            } catch(err){
                console.log(err);
                setPreInviteResult(false);
                setPopupTitle('Error occurred...');
                setPopupText(`Pre-invite fail`);
            }
        }
    if(open){
        fetch_pre_invite();
    }
      }, [open]);


    return (
        <div>
            {/* ====  result dialog ===*/}
            <Dialog
                open={open}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

            <div style={{backgroundColor:"#3d3d3d", color: preInviteResult?"#9bdb5a":"#d45559", textAlign:"center"}}>
                <DialogTitle id="alert-dialog-title">{popupTitle}</DialogTitle>
                <DialogContent style={{color:"white"}}>
                {popupText}   
                </DialogContent>
                <div style={{display:"flex", justifyContent:"center", marginTop:10}}>
                    {preInviteResult ? 
                    (   <DialogActions>
                        <Button onClick={handleClosePopup} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={handleSendInvite} color="primary">
                        <b>Send</b>
                        </Button>
                        </DialogActions>)
                    :
                    (    <DialogActions>
                        <Button onClick={handleClosePopup} color="primary">
                        OK
                        </Button>
                        </DialogActions>) 
                    }

                </div>
            </div>
            </Dialog>
            {/* ==== -------------------- ===*/}
        </div>
    )
}

export default DialogBox;
