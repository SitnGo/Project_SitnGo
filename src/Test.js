import React from "react";
import {
    Grid,
} from '@material-ui/core';

const Test = () => {
    return(
        <Grid
            style={{height: '250px', background: 'red'}}
            xs={12}
            container
            alignItems='center'
            alignContent='center'
            justify='space-around'
        >
            <Grid
                style={{height: '50px', background: 'green'}}
                item
                xs={3}
            >3</Grid>
            <Grid
                style={{height: '100px', background: 'yellow'}}
                xs={9}
                lg={8}
                container
                alignItems='center'
                alignContent='center'
                justify='space-around'
            >
                <Grid
                    style={{height: '50px', background: 'green'}}
                    item
                    xs={3}
                >
                    <Grid
                        style={{height: '50px', background: 'black'}}
                        item
                        xs={2}
                    >12</Grid>
                </Grid>
                <Grid
                    style={{height: '100px', background: 'pink'}}
                    xs={9}
                    lg={8}
                    item
                >9</Grid>

            </Grid>
        </Grid>
    );
};

export default Test;