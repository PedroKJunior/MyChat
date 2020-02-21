import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

import HeaderMain from './../components/header/HeaderMain'
import Usersbar from './../components/usersbar/Usersbar'
import Editor from './../components/editor/Editor'
import Messages from './../components/messages/Messages'
import Statusbar from './../components/statusbar/Statusbar'
import ExitButton from './../components/exitButton/ExitButton'

import './main.sass'

let socket

function Main(props) {

    const { name } = props.location.state
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])
    const [ users, setUsers] = useState([])
    const ENDPOINT = 'http://localhost:8000'

    useEffect(() => {
        const connectSocket = (endpoint) => {
            socket = io(endpoint)
            socket.emit('join', { name }, (error) => {
                if(error) {
                    alert(error)
                }
            })
        }
        connectSocket(ENDPOINT)
    },[ENDPOINT, name])

    

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
        
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [messages])

    const sendMessage = (msg) => {
        if(msg) {
            socket.emit('sendMessage', msg, () => {})
        }
    }

    const exitRoom = event => {
        event.preventDefault()

        socket.emit('disconnect')
        socket.off()
        props.history.push('/')
    }

    return (
        <div id="App">
            <aside>
                <Statusbar user={props.location.state}>
                    <ExitButton handleClick={ exitRoom }/>
                </Statusbar>
                <Usersbar users={users} />
            </aside>
            <main>
                <HeaderMain />
                <Messages messages={messages} name={name} />
                <div className="editor-container">
                    <Editor
                        message={ message }
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
            </main>
        </div>
    )
}

export default Main