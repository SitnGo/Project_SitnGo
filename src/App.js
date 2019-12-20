import React, { useEffect, useState} from 'react';
import './App.css';
import Header from "./components/header/header";
import HeaderImage from "./components/headerImage/headerImage";
import ParallaxVideo from "./components/parallaxVideo/parallaxVideo";
import Footer from './components/footer/footer'
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ToTop from "./components/totop/toTop";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SignUp from "./components/register/register1";
import AlertDialogSlide from "./components/sign_in/dialog";
<<<<<<< HEAD
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import allReducers from './components/sign_in/reducers/index';
// import fire from './ConfigFirebase/Fire';


//const store = createStore(allReducers)
=======
import AlertDialogSlideSignUp from "./components/register/dialogSignUp"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import allReducers from './components/sign_in/reducers/index';
import reducers from "./components/sign_in/reducers/reducers"
import fire from './ConfigFirebase/Fire';
import { useSelector } from 'react-redux';

// const store = createStore(allReducers)
const store = createStore(reducers);
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57

function App() {
    const [openSignInBox, setOpenSignInBox] = useState(false);
    const [openSignUPBox, setOpenSignUPBox] = useState(false);
    // const [user, setUser] = useState(null);

    // useEffect(()=>{authListener()},[user]);
    // function authListener() {
    // fire.auth().onAuthStateChanged((user) => {
    //   console.log(user);
    //   if (user) {
    //     setUser(user);
    //     localStorage.setItem('user', user.id);
    //   } else {
    //     setUser(null);
    //     localStorage.removeItem('user');
    //   }
    // });
// }

  const isLogged = useSelector(state => state.isLogged);
  const openSignIn = useSelector(state => state.openSignIn);

    return (
        <div className="App">
            <Router>
<<<<<<< HEAD
                {/* <Provider store = {store}> */}
                <Header user={user} setUser={setUser} setOpen={setOpen}/>
                {/* </Provider> */}
                <AlertDialogSlide  setUser={setUser} open={open} setOpen={setOpen}/>
=======
                <Provider store = {store}>
                <Header />
                
                <AlertDialogSlide />
                <AlertDialogSlideSignUp />
                </Provider>
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57
                <Switch>
                    <Route exact path="/">
                        <HeaderImage/>
                        <About/>
                        <ParallaxVideo/>
                        <Contact/>
                        <ToTop/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
