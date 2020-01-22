import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Fab} from '@material-ui/core';
import styles from "./style";

const ToTop = () => {
    const classes = styles();
    return(
        <Fab href='#' className={classes.toTop} size='medium'>
            <KeyboardArrowUpIcon/>
        </Fab>
    );
}

export default ToTop;