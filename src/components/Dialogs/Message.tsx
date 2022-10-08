import * as React from 'react';
import style from "./dialogs.module.scss"

const Message = (props) => {


    let currentUserId = 0
    if (props.myId !== props.senderId) {
        currentUserId = props.senderId
    } else {
        currentUserId = props.recipientId
    }

    return (<div className={style.dialog_message}>
        <div className={style.message_title}>
            <div><b>{props.senderName}</b></div>
            <div className={style.end}>{props.addedAt}
                {props.myId === props.senderId ? (props.viewed ? ' //' : ' (not viewed)') : null}</div>
            <div className={style.deleteMessage} onClick={() => props.onDeleteMessage(props.id, currentUserId)}> X</div>
        </div>
        <div>{props.message}</div>

    </div>)
}

export default Message;