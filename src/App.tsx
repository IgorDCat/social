import * as React from 'react';
import {useEffect} from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import {Route, Routes} from "react-router-dom";
import {UsersComponent} from "./components/Users/Users";
import LoginPage from "./components/login/Login";
import Settings from "./components/Settings/Settings";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppThunk} from "./redux/app_reducer";
import Preloader from "./components/Preloader";
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {rootState} from "./redux/redux_store";
import Header from "./components/Header/Header";
import Friends from "./components/Friends";


export const App = () => {

    const initialized = useSelector((state: rootState) => state.app.initialized);
    const dialogs = useSelector((state: rootState) => state.dialogs);
    const state = useSelector((state: rootState) => state);
    const unreadMessages = useSelector((state: rootState) => state.dialogs.unreadMessages);
    const dispatch = useDispatch();
    const login = useSelector((state: rootState) => state.profile.authData.login);

    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])


    if (initialized === false) return <Preloader/>
    return (
        <div className='app_wrapper'>
            <Header login={login}/>
            <Navbar dialogs={dialogs} unreadMessages={unreadMessages} login={login}/>
            <Routes>

                <Route path='/dialogs/*' element={<Dialogs unreadMessages={unreadMessages}/>}/>
                <Route path='/profile/*' element={<Profile/>}/>
                <Route path='' element={<Profile/>}/>
                <Route path='/login' element={<LoginPage state={state}/>}/>
                <Route path='/friends' element={<Friends/>}/>
                <Route path='/users/*' element={<UsersComponent isShowFriendsActive={false}/>}/>
                <Route path='/settings' element={<Settings state={state}/>}/>

            </Routes>

        </div>
    );
}
