import React, {useState,useEffect, Fragment} from 'react';
import './App.css';
import Header from "./components/header/header";
import HeaderImage from "./components/headerImage/headerImage";
import ParallaxVideo from "./components/parallaxVideo/parallaxVideo";
import Footer from './components/footer/footer'
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import ToTop from "./components/totop/toTop";
import reducers from "./components/sign_in/reducers/reducers"
import NotFound from './components/404notFound/404notFoundScript';
import {useCookies} from 'react-cookie';
import { signOutAction, SignInAction } from './components/sign_in/actions/index';
import OfferRoute from './components/offerRoute/offerRoute'
import GetRout from "./components/getRout/getRout";
import { useDispatch} from 'react-redux';
import fire from './ConfigFirebase/Fire';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { createStore } from 'redux';
import { useSelector } from 'react-redux';
import AlertDialogSlide from "./components/sign_in/dialogSignIn";
import AlertDialogSlideSignUp from "./components/signUp/dialogSignUp"
import PersonalInfo from './components/profilePage/personalInfo';
import Test from "./components/getRout/test";
const store = createStore(reducers);

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['loginPassword']);
    const dispatch = useDispatch();

    let isLogged = useSelector((state)=> state.isLoggedInUser);
    useEffect(()=>{
        let isLogged = JSON.parse(localStorage.getItem("isLogged"));
        if(isLogged) {
            fire.auth().signInWithEmailAndPassword(cookies.loginPassword.email, cookies.loginPassword.password)
            .then(a => {
                async function getMarker(user={}) {
                    const userId = fire.auth().currentUser.uid;
                    user = await fire.firestore().collection("users").doc(userId).get()
                    user = user.data();
                    // localStorage.setItem("isLogged","true");
                    // setCookie('loginPassword', loginPassword, { path: '/', maxAge: 3600 });
                    await localStorage.setItem("userId",userId);    
                    return user;
                }
                getMarker().then(result => {
                    localStorage.setItem("userId",result.userId); 
                    dispatch(SignInAction(result));
                });
            })


        //     async function getMarker(user={}) {
        //         const userId = JSON.parse(localStorage.getItem("userId"))

        //         user = await fire.firestore().collection("users").doc(userId).get()
        //         user = user.data();
        //         localStorage.setItem("isLogged","true");
        //         return user;
        //     }
        //     getMarker().then(result => {
        //         dispatch(SignInAction(result, JSON.parse(localStorage.getItem("isLogged"))));
        //     });
        }else{
            dispatch(signOutAction(JSON.parse(localStorage.getItem("isLogged"))));
        }
    },[])
    return (
        <div className="App">
            <Router>
                <Header />
                <AlertDialogSlide />
                <AlertDialogSlideSignUp />
                <Switch>
                    <Route exact path="/">
                        <HeaderImage/>
                        <About/>
                        <ParallaxVideo/>
                        <Contact/>
                        <ToTop/>
                    </Route>
                    { JSON.parse(localStorage.getItem('isLogged')) ?  
                    <>
                        <Route exact path="/profile" component={PersonalInfo}/>
                        <Route exact path ="/offerRoute" >
                            <HeaderImage/>
                            <OfferRoute/>
                        </Route>
                        <Route path="/getRout">
                            <GetRout/>
                        </Route>
                        <Route path="/test">
                            <Test/>
                        </Route>
                    </>
                    : <Route path="*" component={NotFound}/> }
                    <Route path="*" component={NotFound}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;