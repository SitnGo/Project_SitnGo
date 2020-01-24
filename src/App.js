import React, {useEffect} from 'react';
import './App.css';
import Header from './components/header/header';
import HeaderImage from './components/headerImage/headerImage';
import ParallaxVideo from './components/parallaxVideo/parallaxVideo';
import Footer from './components/footer/footer'
import About from './components/about/about';
import Contact from './components/contact/contact';
import ToTop from './components/totop/toTop';
import NotFound from './components/404notFound/404notFoundScript';
import {SignInAction,signOutAction } from './actions/index';
import OfferRoute from './components/offerRoute/offerRoute'
import GetRout from './components/getRout/getRout';
import { useDispatch, useSelector} from 'react-redux';
import fire from './ConfigFirebase/Fire';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AlertDialogSlide from './components/sign_in/dialogSignIn';
import AlertDialogSlideSignUp from './components/signUp/dialogSignUp'
import PersonalInfo from './components/profilePage/personalInfo';
import Test from './Test'


function App() {
    const dispatch = useDispatch();
    let user = useSelector((state)=> state.user);
    useEffect(()=>{
        fire.auth().onAuthStateChanged((e)=>{
            if(e){
            dispatch(SignInAction(e));
            console.log(e)
            }else {
                dispatch(signOutAction(e));
            }
        })
    },[])
    return (
        <div className='App'>
            <Router>
                <Header />
                <AlertDialogSlide />
                <AlertDialogSlideSignUp />
                <Switch>
                    <Route exact path='/'>
                        <HeaderImage/>
                        <About/>
                        <ParallaxVideo/>
                        <Contact/>
                        <ToTop/>
                    </Route>
                    {
                        user ?
                            <>
                                <Route exact path='/profile' component={PersonalInfo}/>
                                <Route exact path ='/offerRoute' >
                                    <OfferRoute/>
                                </Route>
                                <Route path='/getRout'>
                                    <GetRout/>
                                </Route>
                                {/*Testtttttttt*/}
                                <Route path='/test'><Test/></Route>
                            </>
                            : <Route path='*' component={NotFound}/>
                    }
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;