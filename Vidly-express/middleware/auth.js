
const jwt = require('jsonwebtoken')
const config = require('config')


function auth(req,res,next){

    const token = req.header('x-auth-token')

    if (!token){
        return res.status(401).send('Access Deined. No token Provided !!')
    }

    try {
        const decoded = jwt.verify(token,config.get('jwtPrivateKey'))

        req.user = decoded;

        res.send(true)

        next()

    } catch (error) {
        return res.status(400).send('Invalid token.')
    }    
}

module.exports = auth