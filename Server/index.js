const express = require('express')
const cors = require('cors')
const router = require('./src/router')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./src/users')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const io = require('socket.io') 
const server = io.listen(8000)

const listMessages = []

server.on('connection', socket => {
    socket.on( 'join', ({ name }, callback) => {
        console.log(`User ${ name } is join`)
        const { error, user } = addUser({ id: socket.id, name })

        if(error) return callback(error)

        socket.join('room')

        socket.emit('message', { user: 'Admin', text: `${user.name}, bem vindo ao MyChat`})
        socket.broadcast.emit('message', { user: 'Admin', text: `${user.name}, entrou na sala` })
        server.emit( 'roomData', { users: getUsersInRoom() })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        listMessages.push(message)

       server.emit('message', { user: user.name, text: message })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log(`User has left!!!`)

        if(user) {
            server.emit('message', { user: 'Admin', text: `${user.name} saiu.` } )
            server.to('room').emit('roomData', { users: getUsersInRoom() })
        }
    })

})

app.listen(4000, () => {
    console.log('Server listening on port 4000')
})