import React,{useState} from 'react';
import {Typography, Button, TextField} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Tab from './tabInformation';
import useStyles from './style';
import fire from '../../ConfigFirebase/Fire';
// import { FilePicker } from 'react-file-picker'
function aa () {
    //where("name", "==", true)
   let a =  fire.firestore().collection("users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data());
        });
        // console.log(querySnapshot);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    })
    // console.log(a);
}
aa();
function usePersonalInfo() {
    const [isEdit, setEditValue] = useState(true);
    const classes = useStyles();
    let dataList = ["Name","Surname","Phone"];
    const typographyArr = [];
    function isEditBtnClick() {
        setEditValue(!isEdit);
        alert("A");
     
    }
    return(
    <div> 
        {/* <div className={classes.header2}> */}
          {/* { !isEdit ? ( <Avatar className={classes.bigAvatar} > A </Avatar>) */}
             {/* : */}
            {/* (<FilePicker  */}
                {/* extensions={['jpg', 'jpeg', 'png']} */}
                {/* dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}} */}
            {/* > */}
                {/* <Avatar className={classes.bigAvatar} style={{cursor:"pointer"}}> A </Avatar>    */}
            {/* </FilePicker>) } */}
        {/* </div> */}
           <div>
            <div className={classes.personalInfoBlock1}>
                <span style={{display:"none"}}>{isEdit === false ? dataList = ["Name","Surname", "Change Password", "Repeat password", "Phone"] : ""} </span>
                {dataList.forEach(function (el,i) {
                typographyArr.push( isEdit ?
                
                (<Typography className={classes.textColor} 
                    key={i}>{el}
                    {/* - {fire.firestore().collection("users").doc("ZMnMnvAF9jZ3lMGUFElr")} */}
                </Typography> )
                    :
                (<TextField className={classes.textField} key={i} placeholder={el} InputProps={{className:classes.input}}/>));
                })}
                    
                <Button className={classes.editButton} variant="contained" color="secondary" onClick={isEditBtnClick}> <EditIcon/> {isEdit ? "Edit" : "Confirm"}</Button>
                {typographyArr}
            </div>

            <div className={classes.personalInfoBlock2}>
                <Tab/> 
            </div>
        </div>    
    </div>

    );
}

export default usePersonalInfo;