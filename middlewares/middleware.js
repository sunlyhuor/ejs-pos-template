const { parseCookieString } = require("../utils/utils")
const { SuccessMessage } = require("../utils/message")
const { Verify } = require("../libs/jwt")
require("dotenv").config()

function LangMiddleware( req, res, next ) {
    if( !parseCookieString(req.headers.cookie).LANG ){
        res.cookie("LANG", process.env.DEFAULT_LANG, { maxAge: 24 * 60 * 60 * 7, httpOnly: true })
    }
    next()
}

function AuthenticateMiddleware( req, res, next ) { 

    if( !req.headers.authorization  ){
        if( !parseCookieString(req.headers.cookie).accessToken ){
            return res.redirect("/login")
        }else{
            try{
                const data = Verify(parseCookieString(req.headers.cookie).accessToken, process.env.JWT_ACCESS_SECRET)
                req.data = data
                next()
            }catch(e){
                return res.redirect("/unauthorized")
            }
        }
    }else{  
        try{
            const data = Verify(req.headers.authorization, process.env.JWT_ACCESS_SECRET)
            req.user = data
            next()
        }catch(e){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
    }
}

function IsLoginMiddlware( req, res, next ){
    if(parseCookieString(req.headers.cookie).accessToken && parseCookieString(req.headers.cookie).refreshToken && parseCookieString(req.headers.cookie).isLogin){
        res.redirect("/")
    }else{
        res.cookie("accessToken", "", {
            maxAge: -1,
            httpOnly: true
        })
        res.cookie("refreshToken", "", {
            maxAge: -1,
            httpOnly: true
        })
        res.cookie("isLogin", "", {
            maxAge: -1,
            httpOnly: true
        })
        res.cookie("user", "", {
            maxAge: -1,
            httpOnly: true
        })
        next()
    }
}

function Authorize(roles = []) {
    
    return (req, res, next) => {
        
        if( !req.headers.authorization ){
            const token = parseCookieString(req.headers['cookie']).accessToken;
            if (!token) {
                return res.redirect("/unauthorized")
            }
    
            try {
                // Verify token
                const decoded = Verify(token, process.env.JWT_ACCESS_SECRET);
                req.user = decoded;
    
                // Check if user has required role
                if ( !roles.includes(req.user.role)) {
                    return res.redirect("/unauthorized")
                }
    
                // If everything is good, proceed to the next middleware
                next();
            } catch (error) {
                return res.status(400).json({ message: 'Invalid token.', err:error });
            }
        }else{
            try {
                const token = req.headers.authorization
                // Verify token
                const decoded = Verify(token, process.env.JWT_ACCESS_SECRET);
                req.user = decoded;
    
                // Check if user has required role
                if ( !roles.includes(req.user.role)) {
                    return res.status(401).json({ message: 'Unautorized.' });
                }else{
                    // If everything is good, proceed to the next middleware
                    return next();
                }
    
            } catch (error) {
                return res.status(400).json({ message: 'Invalid token.' });
            }
        }

    }
    
}

module.exports = {
    LangMiddleware,
    AuthenticateMiddleware,
    IsLoginMiddlware,
    Authorize
}