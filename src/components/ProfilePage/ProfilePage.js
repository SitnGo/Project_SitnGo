import React from 'react';
import fire from './Config/Fire';
import {Button} from '@material-ui/core/';
import {useDispatch} from 'react-redux';
import {loggedReducer} from './actions';

export default function ProfilePage () {
    // const dispatch = useDispatch();

     function logout() {
        fire.auth().signOut();
        // dispatch(loggedReducer());
    }
    return (<div>
                <h1>You are home </h1>
                <Button onClick = {logout}>Logout</Button>
            </div>
    )
}
