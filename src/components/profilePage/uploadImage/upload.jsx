import React from 'react';
import style from './style';
import {Avatar} from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone'
import storage from '../../../ConfigFirebase/storage';
import fire from '../../../ConfigFirebase/Fire';
class DropzoneDialogModeal extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            bool:false,
            url:"",
            files: []

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
        //  if (fire.auth().currentUser.uid === ) {

        
        const uploadFile = storage.ref(`images/${fire.auth().currentUser.uid}/${files[0].name}`).put(...files);
        uploadFile.on("state_changed", 
            (snapshot)=> {

            },  
            (error)=> {
                console.log(error);
            },
            ()=> {

                storage.ref(`images/${fire.auth().currentUser.uid}`).child(files[0].name).getDownloadURL().then(url=>{
                    // localStorage.setItem("url", url);
                    this.setState(()=>({url,}));
                    // console.log(fire.auth().currentUser.uid);
                    // this.setState({bool: !this.state.bool});
                })
            });
        // }  
    }
    
    handleOpen = () => {
        this.setState({
            open: true,
        });
    }
 
    render() {
        return (
            <div>
                <Avatar     
                 onClick={this.handleOpen} style={style} src={this.state.url}></Avatar> 
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

export default DropzoneDialogModeal;
