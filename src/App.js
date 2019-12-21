import React, {useState} from 'react';
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
import AlertDialogSlideSignUp from "./components/register/dialogSignUp"
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import allReducers from './components/sign_in/reducers/index';
import reducers from "./components/sign_in/reducers/reducers"
import fire from './ConfigFirebase/Fire';
import { useSelector } from 'react-redux';
import PersonalInfo from "./components/profilePage/personalInfo";
// const store = createStore(allReducers)
const store = createStore(reducers);

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
                    <Route exact path="/profile">
                        <PersonalInfo/>
                    </Route>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
