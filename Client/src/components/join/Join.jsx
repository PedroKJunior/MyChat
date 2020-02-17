import React, { useState, useEffect } from 'react'
import { MdChatBubble, MdErrorOutline } from 'react-icons/md'
import axios from 'axios'

import './join.sass'

const api = async userGit => {
    return await axios.post('http://192.168.15.25:4000/newUser', userGit)
}

function Join(props) {

    const [ userEmpty, setUserEmpty] = useState(false)
    const [userNotFound, setUserNotFound] = useState(false)
    const [name, setName] = useState('')
    const [userGit, setUserGit] = useState(undefined)

    const handleChange = event => {
        setName(event.target.value)
    }

    useEffect(() => {
        const getUserGit = () => {
            if(userGit){
                props.history.push({
                    pathname: '/main',
                    state: userGit
                })
            }
        }

        if(userGit !== undefined)
            getUserGit()

    },[userGit, props])

    const handleClick = () => {

        setUserEmpty(name === '' ? true : false)

        if(!userEmpty){
            const obj = { user_github: name }
            api(obj).then( response => {
                response.data.error === true
                    ? setUserNotFound(true)
                    : setUserGit(response.data)
            })

            setName('')
        }
    }

    return (
        <div className="background">
            <div className="container-user">
                <div className="container-draw">
                    <div className="logo"> 
                        <span className='my'>My</span>
                        <span className='chat'>Chat</span>
                        <MdChatBubble />
                    </div>
                    <div className="color"></div>
                    <div className="border"></div>
                </div>
                <div className="container-form">
                   { userNotFound && !userEmpty && <div className="join-error">
                        <span className="user-text-error">
                            Este usuário não existe
                        </span>
                        <MdErrorOutline className='icon-error'/>
                    </div>}
                    { userEmpty && <div className="join-error">
                        <span className="user-text-error">
                            Campo obrigatório
                        </span>
                        <MdErrorOutline className='icon-error'/>
                    </div>}
                    <div className="input-box">
                        <input
                            type="text" 
                            name="name" 
                            id="name"
                            onChange={handleChange}
                            value={name}
                            onFocus={ () => {setUserNotFound(false)}}
                        />
                        <div className="border-input"></div>
                        <label htmlFor="name">Nome de usuário github</label>
                    </div>
                    <button onClick={handleClick}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default Join