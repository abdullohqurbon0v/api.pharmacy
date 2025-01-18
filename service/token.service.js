const jwt = require('jsonwebtoken')

class TokenService {
     generateToken(payload) {
          console.log(payload)
          const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
               expiresIn: '15d'
          })
          return accessToken
     }
}

module.exports = new TokenService()