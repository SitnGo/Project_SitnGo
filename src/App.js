import React, {useState, Fragment} from 'react';
import './App.css';
import Header from "./components/header/header";
import HeaderImage from "./components/headerImage/headerImage";
import ParallaxVideo from "./components/parallaxVideo/parallaxVideo";
import Footer from './components/footer/footer'
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ToTop from "./components/totop/toTop";
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/signUp/signUp";
import AlertDialogSlide from "./components/sign_in/dialogSignIn";
import AlertDialogSlideSignUp from "./components/signUp/dialogSignUp"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from "./components/sign_in/reducers/reducers"
import { useSelector } from 'react-redux';
import  PersonalInfo from './components/profilePage/personalInfo';
const store = createStore(reducers);

function App() {
    let isLogged = useSelector(state => state.isLogged);

    // if(true) {
    //     return <Redirect to="/profile"/>
    // }
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
                   <Route path="/profile" component={PersonalInfo}/> 
                
                    <Route path="*" component={()=> "404 Not found"}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;
