import React from 'react';
import fire from './Config/Fire';
import {Button} from '@material-ui/core/';

export default function ProfilePage () {

     function logout() {
        fire.auth().signOut();
    }
    return (<div>
                <h1>You are home </h1>
                <Button onClick = {logout}>Logout</Button>
            </div>
    )
}
