import React from 'react'

import './usersbar.sass'

const Usersbar = ({ users }) => {

    const listNames = users.map( user => {
        const name = user.name.split(' ', 2)
        return name.join(' ')
    })
    return (
        <div className="section-users">
            <div className="title">Usuários</div>
            <ul>
            { listNames.map((name, index) => <li key={index} className="online">{ name }</li> )}
            </ul>
        </div>
    )
}


export default Usersbar