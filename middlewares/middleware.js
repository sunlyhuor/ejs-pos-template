const { parseCookieString } = require("../utils/utils")
const { SuccessMessage } = require("../utils/message")

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
        }
        next()
    }else{  
        next()
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

module.exports = {
    LangMiddleware,
    AuthenticateMiddleware,
    IsLoginMiddlware
}