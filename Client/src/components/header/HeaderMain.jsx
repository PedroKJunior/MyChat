import React from 'react'
import { MdChatBubble } from 'react-icons/md'

import './header.sass'

function HeaderMain() {
    return <div className='header'>
        <div className='title-header'> 
            <div className="logo"> 
                <span className='my'>My</span>
                <span className='chat'>Chat</span>
                <MdChatBubble />
            </div>
        </div>
    </div>
}
export default HeaderMain