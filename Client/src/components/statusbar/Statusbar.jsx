import React from 'react'

import './statusbar.sass'

const Statusbar = ({ user, children }) => (
    <div className="container-status">
        <img 
            src={ user.avatar_url }
            alt={ user.name } 
            className="image"
        />
        <span className='name'>{ user.name }</span>
        { children }
    </div>
)

export default Statusbar