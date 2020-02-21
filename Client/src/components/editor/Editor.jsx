import React, { useRef, useState, useEffect } from 'react'
import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdCode, MdSend } from 'react-icons/md'

import './editor.sass'


const Editor = ({ sendMessage }) => {

    const [codeStyle, setCodeStyle] = useState(false)

    const editor = useRef()
    const textPlaceholder = useRef()

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

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleMessage()
            textPlaceholder.current.classList.remove('hidden')
        } else {
            textPlaceholder.current.classList.add('hidden')
        }
    }

    const placeholder = () => {
        if(editor.current.innerText === '') textPlaceholder.current.classList.remove('hidden')
    }

    const handleMessage = () => {
        sendMessage(editor.current.innerHTML)
        editor.current.innerText = ''
        editor.current.blur()
    }
            
    return (
        <div className='container'>
            <div className="body-message">
                <span ref={textPlaceholder} className="placeholder">Escreva seu texto aqui</span>
                <div 
                    ref={editor} 
                    className='editor' 
                    suppressContentEditableWarning={true} 
                    contentEditable='true'
                    src='about:blank'
                    onKeyPress={ handleKeyPress }
                    onBlur={ placeholder }
                >
                </div>
                <div className="toolbar">
                    <div onClick={bold} ><MdFormatBold className='icons'/></div>
                    <div onClick={italic} ><MdFormatItalic className='icons'/></div>
                    <div onClick={underline} ><MdFormatUnderlined className='icons'/></div>
                    <div onClick={code} ><MdCode className='icons'/></div>
                </div>
            </div>
            <MdSend className="button" onClick={ handleMessage }/>
        </div>
    )
}

export default Editor