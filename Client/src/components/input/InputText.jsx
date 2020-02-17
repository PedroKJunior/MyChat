import React from 'react'
import { MdSend } from 'react-icons/md'

import './input.sass'

function InputText({ setMessage, sendMessage, message }) {
    return (
        <div className='container-input'>
            <input 
                type='text' 
                className='textarea' 
                placeholder="Escreva sua mensagem aqui"
                value={ message }
                onChange={({ target: { value } }) => setMessage(value)} 
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
            />           
            <MdSend className="button" onClick={ e => sendMessage(e)}/>
        </div>
    )
}
export default InputText