import React, { Component } from 'react';
import fire from './Config/Fire';
import {Button} from '@material-ui/core/';


class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        return (
            <div>
                <h1>You are home </h1>
                <Button onClick = {this.logout}>Logout</Button>
            </div>
        );

    }
}
            
export default Home;