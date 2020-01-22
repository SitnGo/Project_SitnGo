import React, { useState } from 'react';
import style from './style';
import {Avatar} from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone'
import storage from '../../../ConfigFirebase/storage';
import fire from '../../../ConfigFirebase/Fire';
import {confirmUpdate} from '../../sign_in/actions/index';
class DropzoneDialogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            bool:false,
            files: [],
        };
    }

    

    handleClose = () => {
        this.setState({
            open: false
        });
    }

    handleSave = (files) => {
        this.setState({
            files,
            open: false
        });
        const uploadFile = storage.ref(`images/${fire.auth().currentUser.uid}/${files[0].name}`).put(...files);
        uploadFile.on('state_changed',
            (snapshot)=> {

            },
            (error)=> {
                console.log(error);
            },
            ()=> {
                storage.ref(`images/${fire.auth().currentUser.uid}`).child(files[0].name).getDownloadURL()
                .then(url=>{
                    fire.firestore().collection('users').doc(fire.auth().currentUser.uid).set({url}, { merge: true })
                    .then(()=> {
                        alert("upload complete");
                        this.setState({
                            bool: true
                        });
                        this.props.setUrl(url)
                    });
                })
        });
    }

    handleOpen = () => {
        this.setState({
            open: true,
        });
    }

    render() {
        return (
            <div>
                {console.log(style)}
                <Avatar onClick={this.handleOpen} src={this.props.url} />
                {/* <updateImage/> */}
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
                    onChange={this.onChange}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    filesLimit={1}
                    maxFileSize={5000000}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

export default DropzoneDialogModal;
