import React, { useState } from 'react';
import {Paper, Button} from '@material-ui/core';
import styles from './style';

export default function CenteredTabs(props) {
    const classes = styles();
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
            <Button
                variant='outlined'
                onClick={handleClick1}
                className={classes.button}
            >
                Passager
            </Button>
            <Button
                variant='outlined'
                onClick={handleClick2}
                className={classes.button}
            >
                Driver
            </Button>
        </Paper>
    );
}