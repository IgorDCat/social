import * as React from 'react';
import {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {initialStateType, setUnreadMessages} from "../../redux/messages_reducer";
import style from "./navbar.module.scss"

type propsType = {
    dialogs: initialStateType;
    unreadMessages: number | null;
    login: null | string
}

const Navbar = (props: propsType) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.login){
            dispatch(setUnreadMessages())
        }
    },[props.unreadMessages])

    if(props.unreadMessages==null && props.login) dispatch(setUnreadMessages())

    return (
        <nav className={style.nav}>
            <NavLink to ='/profile'>
                <div className={style.nav_link}>Profile</div>
            </NavLink>
            <NavLink to='/dialogs/'>
                <div className={style.nav_link}>Messages {props.unreadMessages? '('+props.unreadMessages+')' : null}</div>
            </NavLink>
            <NavLink to='/friends/'>
                <div className={style.nav_link}>Friends</div>
            </NavLink>
            <NavLink to='/settings'>
                <div className={style.nav_link}>Settings</div>
            </NavLink>
            <NavLink to='/users'>
                <div className={style.nav_link}>Users</div>
            </NavLink>
            <br/>
        </nav>
    )
}

export default Navbar;