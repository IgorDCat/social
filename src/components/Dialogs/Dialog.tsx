import * as React from 'react';
import {NavLink} from "react-router-dom";
import {setMessages} from "../../redux/messages_reducer";
import {useSelector} from "react-redux";
import {rootState} from "../../redux/redux_store";
import style from "./dialogs.module.scss"

const Dialog = (props) => {
    let path = '/dialogs/' + props.id;
    let selectedFriend = useSelector((state: rootState) => state.dialogs.selectedFriend);

    const setLocalMessages = () => {
        props.dispatch(setMessages(props.id));
        props.setCurrentUser(props.id);
    }

    return (
        <div className={selectedFriend === props.id? style.dialog_friend_selected : style.dialog_friend} onClick={()=> setLocalMessages()} >
            <div className={style.dialogImg}><img src={props.avatar} className={style.dialogImg}/></div>
            <div className={style.friend_name}><NavLink to={path}>{props.name}</NavLink></div>
            <div className={style.friend_info}>Last activity: {props.lastUserActivityDate}<br/>
            new messages: {props.hasNewMessages? ' yes': ' no'}</div>

        </div>
    )
}

export default Dialog;