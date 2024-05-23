const jwt = require("jsonwebtoken")
const {HTTPStatusCode,ErrorMessages} = require("./global.ts")
const auth = (req,res,next)  =>{
    console.log(req.cookies)
    const {token} = req.cookies
    if(!token){
        return res.status(HTTPStatusCode.BAD_REQUEST).json({message:ErrorMessages.LOGIN_FIRST})
    }

    // decode token
    try {
        const decode = jwt.verify(token, 'shhhh')
        console.log("d",decode);
        req.user = decode
        console.log(req.user);
        
    } catch (error) {
        console.log(error);
        return res.status(HTTPStatusCode.INTERNAL_SERVER).json({message:ErrorMessages.INVALID_TOKEN})
    }
    return next()
}
module.exports = auth;