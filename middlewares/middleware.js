const { parseCookieString } = require("../utils/utils")

function LangMiddleware( req, res, next ) {
    // res.json(parseCookieString(req.headers.cookie))
    if( !parseCookieString(req.headers.cookie).LANG ){
        res.cookie("LANG", process.env.DEFAULT_LANG, { maxAge: 24 * 60 * 60 * 7, httpOnly: true })
    }
    next()
}

module.exports = {
    LangMiddleware
}