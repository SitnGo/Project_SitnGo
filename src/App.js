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
import SignUp from "./components/register/register";
import AlertDialogSlide from "./components/sign_in/dialog";
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import allReducers from './components/sign_in/reducers/index';
// import fire from './ConfigFirebase/Fire';


//const store = createStore(allReducers)

function App() {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState(null);

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

    return (
        <div className="App">
            <Router>
                {/* <Provider store = {store}> */}
                <Header user={user} setUser={setUser} setOpen={setOpen}/>
                {/* </Provider> */}
                <AlertDialogSlide  setUser={setUser} open={open} setOpen={setOpen}/>
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
