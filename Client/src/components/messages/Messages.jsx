import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Message from './message/Message'
import './messages.sass'

const Messages = ({ messages, name }) => {

    const boxChat = useRef()

    useEffect(() => {
        const node = ReactDOM.findDOMNode(boxChat.current)
        node.scrollTop = node.scrollHeight
    })

    return (
        <div className="container-messages" ref={boxChat}>
            <div className="messages">
                {messages.map((message, index) => <div key={index}><Message message={ message } name={ name } /></div>)}
            </div>
        </div>
    )
}

export default Messages