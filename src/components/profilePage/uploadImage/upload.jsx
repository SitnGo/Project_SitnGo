import React from 'react';
import style from './style';
import {Avatar} from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone'

class DropzoneDialogModeal extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose = () => {
        this.setState({
            open: false
        });
    }
 
    handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files, 
            open: false
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
                <Avatar     
                 onClick={this.handleOpen} style={style}><img src="./images/avatar.png" width="100%" alt="avatar"/></Avatar> 
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave}
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