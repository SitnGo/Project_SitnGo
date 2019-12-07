import React from 'react';
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

function App() {

    return (
        <div className="App">
            <Router>
                <Header/>
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
