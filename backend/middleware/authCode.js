const jwt = require("../services/jwt")
require('dotenv').config()

module.exports = (req,res,next) => {

    let token = req.headers.authorization;

    let user = jwt.data(token, process.env.JWTPASSWORD_AUTHCODE)

    if (user.email) {
        req.user = user
        next()
    } else{
        return res.send({
            status: 400,
            message: "Didn't pass authentication"
        })
    }

}
