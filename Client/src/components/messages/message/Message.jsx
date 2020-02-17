import React from 'react'
import './message.sass'

const Message = ({ message: { user, text }, name }) => {
    
    name = name.split(' ', 1)
    name = name.join(' ')

    user = user.split(' ', 1)
    user = user.join(' ')
    
    return (
       ( user === name)
        ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{ name }</p>
                <div className="messageBox backgroundOrange">
                    <p className="messageText colorWhite">{ text }</p>
                </div>
            </div>
        )
        :  user === 'Admin' ?
        (
            <div className="messageContainer justifyStart">
                <div className="messageBox">
                    <p className="messageText colorOrange">{ text }</p>
                </div>
                <p className="sentText pl-10">{ user }</p>
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