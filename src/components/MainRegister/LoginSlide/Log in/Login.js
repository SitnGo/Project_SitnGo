import React, { Component } from 'react';
// import fire from './Config/Fire';
import {Button} from '@material-ui/core/';
import { TextField, InputAdornment, IconButton,  } from '@material-ui/core';
import {Visibility, VisibilityOff, Email} from "@material-ui/icons";

// import PasswordField from 'material-ui-password-field';
// import Checkboxes from './checked.js.js.js';
// import { Checkbox } from '@material-ui/core';

// import ls from 'local-storage';

// import { makeStyles } from '@material-ui/core/styles';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.signup = this.signup.bind(this);
    
    this.state = {
      email: '',
      password: '',
      isAnError: false,
      errorMessage :'',
      showPassword: false,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  
  }

  // login(e){
  //   fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  // .then(u => {})
  // .catch(error => {
  //         console.log(error.message);
  //         this.setState({isAnError:true, errorMessage: error.message})
  // });
  // }
  // componentDidMount (){

  // }
  

  // signup(e){
  //   e.preventDefault();
  //   fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  //   }).then((u)=>{console.log(u)})
  //   .catch(error => {
  //     switch (error.code) {
  //        case 'auth/email-already-in-use':
  //          console.log(`Email address ${this.state.email} already in use.`)
  //          this.setState({isAnError:true, errorMessage:`Email address ${this.state.email} already in use.` });
  //          break
  //        case 'auth/invalid-email':
  //          console.log(`Email address ${this.state.email} is invalid.`);
  //          this.setState({isAnError:true, errorMessage:`Email address ${this.state.email} is invalid.` });
  //          break
  //        case 'auth/operation-not-allowed':
  //          console.log(`Enterance is denied.`);
  //          this.setState({isAnError:true, errorMessage:`Entrance is denied` });
  //          break
  //        case 'auth/weak-password':
  //          console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
  //          this.setState({isAnError:true, errorMessage:`Password is not strong enough.` });
  //        default:
  //          console.log(error.message);
  //          this.setState({isAnError:true})
  //      }
  //  });
  // }
  render() {
    return (
      <div>
       <div 
       style={{
        //  background: 'linear-gradient(45deg, #64b5f6 30%, #673ab7 70%)',
       border: 0,
       borderRadius: 3,
      boxShadow: '0 3px 14px 26px rgba(105, 105, 135, .3)',
       color: 'white',
       height: 145,
       alignItemn: 'center',
       padding: '0 30px',
       margin: "auto",
       display:'absalute',
       justify:'center',
       position: 'absolute', 
       left: '50%', 
       top: '20%',
       transform: 'translate(-50%, -50%)'}} 
       >

      <div className="form-group">
       
       <TextField
       margin = "dense"
       color = "primary"
       variant = "outlined"
       label = "Email"
       onChange={this.handleChange} 
       InputProps= {{
        endAdornment:(
           <InputAdornment position = "end">
             <IconButton 
             aria-lebel = "toggle"
             edge= "end"
             >
               <Email/>
             </IconButton>
           </InputAdornment>
         )
       }}
       />
          {/* <Checkbox/> */}
      { (this.state.isAnError === true)? <div style = {{fontSize:10, color: "red"}}>{this.state.errorMessage}</div>:null}
  
      </div>
       <div className="form-group">
    
      <TextField
      margin="dense"
      type={this.state.showPassword ? "text" : "password"}
      color="primary"
      variant="outlined"
      label="Password"
      onChange={this.handleChange}
      InputProps={{
      endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>{ this.state.showPassword ? this.setState({showPassword: false}) : this.setState({showPassword: true})}}
              edge="end"
            >
          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
          )
          }}
      />
        
      </div>
      <Button type="submit" onClick={this.login}> Login</Button>
      <Button onClick={this.signup} style={{marginLeft: '25px'}}>Sign up</Button>

 
 </div>
 </div>
    );
  }
}
export default Login;