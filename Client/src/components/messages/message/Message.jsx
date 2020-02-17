import React from 'react'
import './message.sass'

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false
    if(user === name) {
        isSentByCurrentUser = true
    }

    
    name = name.split(' ', 1)
    name = name.join(' ')

    user = user.split(' ', 1)
    user = user.join(' ')
    
    return (
        isSentByCurrentUser
        ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{ name }</p>
                <div className="messageBox backgroundOrange">
                    <p className="messageText colorWhite">{ text }</p>
                </div>
            </div>
        )
        : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundDark">
                    <p className="messageText colorWhite">{ text }</p>
                </div>
                <p className="sentText pl-10">{ user }</p>
            </div>
        )
    )
}

export default Message