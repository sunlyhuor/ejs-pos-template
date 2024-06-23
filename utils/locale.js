const enLang = require("../locales/en.json")
const khLang = require("../locales/kh.json")

function locale(lang){
    if( lang == "kh" ){
        return (khLang)
    }else if(lang == "en"){
        return (enLang)
    }else{
        return (enLang)
    }
}

module.exports = locale