const jwt = require("jsonwebtoken");

module.exports= (req, res, next) => {
    let Token = req.headers['token-key']
    jwt.verify(Token, "SecretKey123", (err,decoded)=>{
        if(err){
            res.status(401).json({status:"unauthoized"})
        }else{
            //Get User name from decoded token and add with req header
            let username = decoded['data']["UserName"];
            req.headers.username=username


            next()
        }
    })
};

