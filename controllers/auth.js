const { sign } = require("jsonwebtoken")
const models = require('./../models')

module.exports = {
    async login(req, res) { // <--
        let credentials = {
            username: req.body.username,
            password: req.body.password
        }
    
        if (!credentials.username || !credentials.password) {
            return res.send('Username dan/atau Password harus diisi!')
        }
    
        let user = await models.User.findOne({ // <--
            where: credentials
        })

        if (!user) return res.send('Username dan/atau Password tidak sesuai') // <--
    
        token = sign(credentials, 'verysecretkey')
        
        return res.send({
            token: token,
            data: credentials
        })
    },

    async register(req, res) { // <--
        let user = await models.User.create({ // <--
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            address: req.body.address
        })

        return res.send({
            data: user
        })
    }
}