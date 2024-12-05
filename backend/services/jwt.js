const jwtService = require("jsonwebtoken");
require('dotenv').config()

const passwordJWT = process.env.JWTPASSWORD;

const jwt = {
    token: (payload, time = "8h", password = passwordJWT) => {
        
        try {
            delete payload.password  
            delete payload.auth_code
            delete payload.code_try
        
            return jwtService.sign({data: payload}, password , { expiresIn: time });
        
        } catch (error) {

            return error
        }
    },

    data: (token, password = passwordJWT) => {

        
        try {
            
            return jwtService.verify(token, password).data;
        
        } catch (error) {
            return error
        }
       

    }
}

module.exports = jwt;
