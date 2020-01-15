import React from 'react';
import style from './style';
import {Avatar} from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone'
import storage from '../../../ConfigFirebase/storage';
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
            files, 
            open: false
        });
         
     
        // console.log(...files);
        // const uploadFile = storage.ref(`images/${files[0].name}`).put(image);
        // uploadFile.on("state_changed", 
        //     (snapshot)=> {

        //     },
        //     (error)=> {
        //         console.log(error);
        //     },
        //     ()=> {
        //         storage.ref("images").child(files[0].name).getDownloadURL().then(url=>{
        //             console.log(url);
        //         })
        //     });  
        // Create a reference to 'mountains.jpg'
   
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

// import React from 'react';
// import storage from '../../../ConfigFirebase/storage';
// class Fileup extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             image:null,
//             url:""
//         } 

//     }

//     handleChange = (e) => {
//         if(e.target.files[0]) {
//             const image = e.target.files[0];
//             // console.log("AWD ", image);
//             this.setState(()=>({image}))
//         }
//     }
//     upload = (e) => {
//         const {image} = this.state;
//         console.log(image);
//         const uploadFile = storage.ref(`images/${image.name}`).put(image);
//         uploadFile.on("state_changed", 
//             (snapshot)=> {

//             },
//             (error)=> {
//                 console.log(error);
//             },
//             ()=> {
//                 storage.ref("images").child(image.name).getDownloadURL().then(url=>{
//                     console.log(url);
//                 })
//             }); 
//     }
//     render() {
//         return (
//            <div>
//                <input type="file" onChange={this.handleChange}/>
//                 <button onClick={this.upload}>upload</button>
//            </div>
//         );
//     }
// }
// export default Fileup;