

const config = require('config')
const jwt = require('jsonwebtoken')




function auth(req,res,next){

    const token = req.header('x-auth-token')

    if (!token){
        return res.status(401).send('Access denied, No access token found.')
    }

    try {

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()
        
        
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth