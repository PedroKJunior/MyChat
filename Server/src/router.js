const { Router } = require('express')
const axios = require('axios')

const routes = Router()

routes.post('/newUser', async (request, response) => {

    try {
        const { user_github } = request.body
        const apiResponse = await axios.get(`http://api.github.com/users/${user_github}`)

        const {name, login, avatar_url } = apiResponse.data
        
        const user = {
            error: false,
            name: name ? name : login,
            avatar_url
        }
        return response.json(user)
    } catch {
        return response.json({ error: true, code: 404, text: 'User not found!'})
    }
})

module.exports = routes