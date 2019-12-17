import React,{useState} from 'react';
import {Typography, Button, TextField} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Tab from './tabInformation';
import useStyles from './style';

// import { FilePicker } from 'react-file-picker'

function usePersonalInfo() {
    const [isEdit, setEditValue] = useState(false);
    const classes = useStyles();
    const dataList = ["Name","Surname", "Change Password", "Confirm Password","Phone"];
    const typographyArr = [];
    function isEditBtnClick() {
        setEditValue(!isEdit);
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
          
            {dataList.forEach(function (el,i) {
            typographyArr.push( !isEdit ?
               
            (<Typography className={classes.textColor} key={i}>{el} - </Typography> )
                :
            (<TextField className={classes.textField} key={i} placeholder={el} InputProps={{className:classes.input}}/>));
            })}
                   
            <Button className={classes.editButton} variant="contained" color="secondary" onClick={isEditBtnClick}> <EditIcon/> {!isEdit ? "Edit" : "Confirm"}</Button>
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