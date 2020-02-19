import React, { useRef, useState, useEffect } from 'react'
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdCode, MdSend } from 'react-icons/md'

import './editor.sass'

const Editor = ({ setMessage, sendMessage, message}) => {

    const [codeStyle, setCodeStyle] = useState(false)

    const editor = useRef()

    const bold = () => { document.execCommand('bold', true, null) }
    const italic = () => { document.execCommand('italic', true, null) }
    const underline = () => { document.execCommand('underline', true, null) }
    
    const code = () => { 
        if(window.getSelection().toString() !== '') 
            setCodeStyle(!codeStyle)
    }
    useEffect(() => {
        codeStyle 
            ? document.execCommand('insertHTML', false, setCode())
            : document.execCommand('removeFormat', true, null)
    },[codeStyle])
    
    const setCode = () => `<code>${window.getSelection()}</code>`

    return (
        <div className='container'>
            <div className="body-message">
                <div 
                    ref={editor} 
                    className='editor' 
                    suppressContentEditableWarning={true} 
                    contentEditable='true'
                    src='about:blank'
                    onChange={({ target: { value }}) => setMessage(value)}
                    onKeyPress={ event => event.key === 'Enter' ? sendMessage(event) : null }
                >{ message || 'Escreva sua mensagem aqui' }</div>
                <MdSend className="button" onClick={ e => sendMessage(e)}/>
            </div>
            <div className="toolbar">
                <div onClick={bold} ><MdFormatBold className='icons'/></div>
                <div onClick={italic} ><MdFormatItalic className='icons'/></div>
                <div onClick={underline} ><MdFormatUnderlined className='icons'/></div>
                <div onClick={code} ><MdCode className='icons'/></div>
            </div>
        </div>
    )
}

export default Editor