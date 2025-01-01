import  jwt  from "jsonwebtoken";

const AuthMiddleware = async (req,res,next)=>{

const {token} = req.headers;

if(!token){

    return res.json({success : false , message : "not authorized"});


}


try {
    
    
    const token_decode = jwt.verify(token,process.env.secret_privatekey);
    req.body.userId = token_decode.id;
    next();


} catch (error) {
    
    console.log(error)
    return res.json({success : false , message : "Error"});

}

}

export default AuthMiddleware;