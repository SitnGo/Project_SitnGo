import React, { useState } from 'react';
import fire from '../../ConfigFirebase/Fire';
import { Button } from '@material-ui/core/';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff, Email } from "@material-ui/icons";
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loggedReducer } from './actions';
import FormDialog from './forgot';

export function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAnError, setIsAnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  //const isLogged = useSelector(state => state.isLogged);
  // const counter = useSelector(state =>state.counter);

  const dispatch = useDispatch();

  const handleChange = name => event => {
    setChecked(event.target.checked);
  };

  function login() {
    fire.auth().signInWithEmailAndPassword(email, password)
      .then(u => { })
      .then(a => {
        dispatch(loggedReducer()) 
        // props.setUser(fire.auth().currentUser);
        props.setOpenSignInBox(false);

        setIsAnError(false);

        })
      .catch(error => {
        console.log(error);
        setIsAnError(true);
        setErrorMessage(error.message)
      });
  }

  function signup(e) {
    e.preventDefault()
    fire.auth().createUserWithEmailAndPassword(email, password).then((u) => {
    }).then((u) => { console.log(u) })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`Email address ${email} already in use.`);
            setIsAnError(true);
            setErrorMessage(`Email address ${email} already in use.`);
            break
          case 'auth/invalid-email':
            console.log(`Email address ${email} is invalid.`);
            setIsAnError(true);
            setErrorMessage(`Email address ${email} is invalid.`);
            break
          case 'auth/operation-not-allowed':
            console.log(`Enterance is denied.`);
            setIsAnError(true);
            setErrorMessage(`Entrance is denied`);
            break
          case 'auth/weak-password':
            console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
            setIsAnError(true);
            setErrorMessage(`Password is not strong enough.`)
            break
          default:
            console.log(error.message);
            setIsAnError(true);
            break;
        }
      });
  }
  return (
    <div style={{
      alignItems: "center",
      display: "flex",
      margin: "auto",
      textAlign: "center",
      padding: '20px',
      verticalAlign: "center",
      flexDirection: "column",
      flexWrap: "wrap",

    }}>
      <div>
        <TextField
          style={{ width: "100%" }}
          autoFocus
          required
          name="email"
          value={email}
          margin="dense"
          color="primary"
          variant="outlined"
          label="Email"
          onChange={e => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label=""
                  edge="end"
                >
                  <Email />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          style={{ width: "100%" }}
          required
          helperText= {(isAnError === true) ? <div style={{ fontSize: 10, color: "red" }}>{errorMessage}</div> : null}
          name="password"
          margin="dense"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          color="primary"
          variant="outlined"
          label="Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => { showPassword ? setShowPassword(false) : setShowPassword(true) }}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <div>
          <Checkbox
            checked={checked}
            onChange={handleChange(checked)}
            value="checked"
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        </div>
        <Button type="submit" onClick={login}> Login </Button>
        <Button onClick={signup} style={{ marginLeft: '25px' }}>Sign up</Button>
        <FormDialog />
      </div>
    </div>
  );
}

export default Login;