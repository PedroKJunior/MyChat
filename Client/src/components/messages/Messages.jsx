import React from 'react'

import Message from './message/Message'
import './messages.sass'

const Messages = ({ messages, name }) => {
    return (
        <div className="container-messages">
            <div className="messages">
                {messages.map((message, index) => <div key={index}><Message message={ message } name={ name } /></div>)}
            </div>
        </div>
    )
}

export default Messages