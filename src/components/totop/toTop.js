import React from 'react';
import {classes} from './style';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Fab} from '@material-ui/core';

const ToTop = () => {
    return(
        <Fab href='#' style={classes.toTop} size='medium'>
            <KeyboardArrowUpIcon/>
        </Fab>
    );
}

export default ToTop;