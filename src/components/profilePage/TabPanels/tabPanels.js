import React, { useState } from 'react';
import {Paper, Button} from '@material-ui/core';
import styles from './style';

export default function CenteredTabs(props) {
    const classes = styles();
    const [changeColor, setChangeColor] = useState(true);
    function handleClick1 () {
        setChangeColor(true);
        props.setTabChange(false);
    }
    function handleClick2 () {
        setChangeColor(false);
        props.setTabChange(true);
    }
    return (
        <Paper className={classes.root} elevation={5}>
            <Button
                variant='contained'
                onClick={handleClick1}
                className={changeColor ?  classes.buttonChangeColor : classes.button}
            >
                Passenger
            </Button>
            <Button
                variant='contained'
                onClick={handleClick2}
                className={!changeColor ? classes.buttonChangeColor : classes.button }
            >
                Driver
            </Button>
        </Paper>
    );
}