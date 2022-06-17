import './App.css';
import React, { Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './common/preloader/Preloader';
import MessengerContainer from './components/Messenger/MessengerContainer';
import Navbar from './components/Navbar/Navbar';
//import News from './components/News/News';
//import Music from './components/Music/Music';
//import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';

const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

function App(props) {
    useEffect(() => {
        props.initializeApp();
    }, []);

    if (!props.initializeApp) {
        return <Preloader />
    }
    
    return (
        <BrowserRouter>
            <div className='body'>
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar />
                    <div className='app-wrapper-content'>
                        <Suspense fallback={<Preloader />}>
                            <Routes>
                                <Route path='/login' element={<Login />} />
                                <Route path='/messenger/*' element={<MessengerContainer />} />
                                <Route path='/profile/:userId' element={<ProfileContainer />} />
                                <Route path='/profile' element={<ProfileContainer/>}/> 
                                <Route path='/news' element={<News />} />
                                <Route path='/music' element={<Music />} />
                                <Route path='/users' element={<UsersContainer />} />
                                <Route path='/settings' element={<Settings />} />
                            </Routes>
                        </Suspense >
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

function mapStateToProps(state) {
    return {
        initialized: state.app.initialized
    };
}

export default connect(mapStateToProps, {initializeApp}) (App);
