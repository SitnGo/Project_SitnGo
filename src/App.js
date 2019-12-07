import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/header/header";
import HeaderImage from "./components/headerImage/headerImage";
import ParallaxVideo from "./components/parallaxVideo/parallaxVideo";
import Footer from './components/footer/footer';
import About from "./components/about/about";
import Contact from "./components/contact/contact";
import MainRegister from "./components/MainRegister/MainRegister"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HeaderImage />
            <About />
            <ParallaxVideo />
            <Contact />
          </Route>
          <Route path="/signup">
            <MainRegister />
          </Route>

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
