import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Paper, Button} from "@material-ui/core";
import useStyles from './style';

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [changeColor1, setChangeColor1] = useState(true);
  const [changeColor2, setChangeColor2] = useState(false);

  function handleClick1 () {
    setChangeColor1(true);
    setChangeColor2(false);
    props.setTabChange(false); 
  }

  function handleClick2 () {
    setChangeColor1(false);
    setChangeColor2(true);
    props.setTabChange(true);
  }
  return (
    <Paper className={classes.root} elevation={2}>
     
        <Button variant="outlined" color={changeColor1 ? "secondary" : "primary"} onClick={handleClick1} className={classes.button}>Passager</Button>
         <Button variant="outlined" color={changeColor2 ? "secondary" : "primary"} onClick={handleClick2} className={classes.button}>Driver</Button>
   
    </Paper>
  );
}