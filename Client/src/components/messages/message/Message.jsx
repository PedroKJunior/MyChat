import React from 'react'
import './message.sass'

const Message = ({ message: { user, text }, name }) => {
    name = name.split(' ', 2) || name
    name = name.join(' ') || name

    user = user.split(' ', 2) || name
    user = user.join(' ') || name
    

    const codeContains = () => {
        if(text.indexOf('code') === 1) { 
            console.log('aqui')
        }
    }

    codeContains()

    return (
       ( user === name)
        ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{ name }</p>
                {
                    text.indexOf('code') === 1 ? (
                        <div className="messageBox">
                            <p  
                                className="messageText colorWhite" 
                                dangerouslySetInnerHTML={{ __html: text }} 
                            />
                        </div>
                    )
                    : (
                        <div className="messageBox backgroundOrange">
                            <p  
                                className="messageText colorWhite" 
                                dangerouslySetInnerHTML={{ __html: text }} 
                            />
                        </div>
                    )
                }
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
                {
                    text.indexOf('code') === 1 ? (
                        <div className="messageBox">
                            <p  
                                className="messageText colorWhite"
                                dangerouslySetInnerHTML={{ __html: text }} 
                            />
                        </div>
                    ) :(
                        <div className="messageBox backgroundDark">
                            <p  
                                className="messageText colorWhite"
                                dangerouslySetInnerHTML={{ __html: text }} 
                            />
                        </div> 
                    )
                }
                <p className="sentText pl-10">{ user }</p>
            </div>
        )
    )
}

export default Message