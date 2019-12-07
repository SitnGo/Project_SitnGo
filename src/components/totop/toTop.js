import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Fab} from '@material-ui/core';
const ToTop = () => {
    const classes = {
        toTop: {
            position: 'fixed',
            zIndex: 10,
            right: '2%',
            bottom: '5%',
        }
    };

    return(
        <Fab href='#' style={classes.toTop} size='medium'>
            <KeyboardArrowUpIcon/>
        </Fab>
    );
}

export default ToTop;