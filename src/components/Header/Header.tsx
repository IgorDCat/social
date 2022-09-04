import * as React from 'react';
import {NavLink} from "react-router-dom";
import cat_logo from '../../assets/images/cat-logo.png';
import {useDispatch} from "react-redux";
import {toLogoutUser} from "../../redux/profile_reducer";
import {initializeApp} from "../../redux/app_reducer";
import style from "./header.module.scss"

const Header = (props) => {
    let classOfLogoutButton = 'button'
    const dispatch = useDispatch()

    const hideLogoutButton = () => {
        classOfLogoutButton = style.hide_button
        return 'log-in'
    }

    const onLogout = async () => {
        await dispatch(toLogoutUser());
        dispatch(initializeApp(null))
    }
    return (
        <header className={style.header}>
            <div>
                <img src={cat_logo}/>
            </div>
            <div className={style.social_netw_name}>
                CAT SOCIAL NETWORK
            </div>
            <span className={style.login_header}>

                    {props.login? props.login + ' ' : hideLogoutButton()}

                 <NavLink to='/login'>
                <button className={classOfLogoutButton} onClick={()=> onLogout()}>log out</button>
                 </NavLink>
            </span>
        </header>
    )
}
export default Header;
