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
import SignUp from "./components/signUp/signUp";
import AlertDialogSlide from "./components/sign_in/dialogSignIn";
import AlertDialogSlideSignUp from "./components/signUp/dialogSignUp"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from "./components/sign_in/reducers/reducers"
import { useSelector } from 'react-redux';

const store = createStore(reducers);

function App() {
    return (
        <div className="App">
            <Router>
                <Provider store = {store}>
                <Header />
                
                <AlertDialogSlide />
                <AlertDialogSlideSignUp />
                </Provider>
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
