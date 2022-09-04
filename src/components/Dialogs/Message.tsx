import * as React from 'react';
import dateformat from "dateformat";
import style from "./dialogs.module.scss"

const Message = (props) => {

    let messageHour = dateformat(props.addedAt, "H");
    messageHour = Number(messageHour) + 3;
    if (messageHour >= 24) messageHour = messageHour - 24;
    let messageDate = dateformat(props.addedAt, ":MM:ss dS mmmm, yyyy");

    let currentUserId = 0
    if (props.myId !== props.senderId) {
        currentUserId = props.senderId
    } else {
        currentUserId = props.recipientId
    }

    return (<div className={style.dialog_message}>
        <div className={style.message_title}>
            <div><b>{props.senderName}</b></div>
            <div className={style.end}>{messageHour + messageDate}
                {props.myId === props.senderId ? (props.viewed ? ' //' : ' (not viewed)') : null}</div>
            <div className={style.deleteMessage} onClick={() => props.onDeleteMessage(props.id, currentUserId)}> X</div>
        </div>
        <div>{props.message}</div>

    </div>)
}

export default Message;