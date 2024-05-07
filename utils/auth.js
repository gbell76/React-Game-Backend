const jwt = require('jsonwebtoken')

const secret = 'hopscotchbananapatch'
const expiration = '1d'

module.exports = {
    signToken: function ({username, password, _id}) {
        const payload = {username, password, _id}
        return jwt.sign({data: payload}, secret, {expiresIn: expiration})
    }

}