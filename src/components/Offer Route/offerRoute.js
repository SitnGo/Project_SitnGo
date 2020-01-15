import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import fire from '../../ConfigFirebase/Fire';
import { useDispatch, connect } from 'react-redux';
import { classes } from './style';
import { Visibility, VisibilityOff, Phone, Email, AccountBox } from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';


const OfferRoute = (props)=>{
    const [where, setWhere] = useState("");
    const [from, setFrom] = useState("");
    const [date, setDate] = useState("");
    const [seats, setSeats] = useState("");
    return (
        <div>
            <div style={classes.signUpContainer}>
              
               <Typography
                    variant="h3"
                    component="h3"
                    margin="normal"
               >Offer Route</Typography> 
               
               
                <TextField 
                    autoFocus
                    margin="dense"
                    color="primary"
                    variant="outlined"
                    label="From"
                    onChange={(e) => { setFrom(e.target.value) }}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <IconButton
                    //                 aria-label="toggle"
                    //                 edge="end"
                    //             >
                    //                 <AccountBox />
                    //             </IconButton>
                    //         </InputAdornment>
                    //     )
                    // }}
                />
                <TextField
                    margin="dense"
                    color="primary"
                    variant="outlined"
                    label="Where"
                    onChange={(e) => { setWhere(e.target.value) }}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <IconButton
                    //                 aria-label="toggle"
                    //                 edge="end"
                    //             >
                    //                 <AccountBox />
                    //             </IconButton>
                    //         </InputAdornment>
                    //     )
                    // }}
                />
                <TextField
                    margin="dense"
                    color="primary"
                    variant="outlined"
                    label="Date"
                    onChange={(e) => { setDate(e.target.value) }}
                    // InputProps={{
                    //     endAdornment: (
                    //         <InputAdornment position="end">
                    //             <IconButton
                    //                 aria-label="toggle"
                    //                 edge="end"
                    //             >
                    //                 <Email />
                    //             </IconButton>
                    //         </InputAdornment>
                    //     )
                    // }}
                />

                <TextField
                    margin="dense"
                    color="primary"
                    variant="outlined"
                    label="Free Seats"
                    onChange={(e) => { setSeats(e.target.value) }}
                />
            </div>
        </div>
    );

}

export default OfferRoute;