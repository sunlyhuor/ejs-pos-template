function SuccessMessage(res, datas, statusCode) {
    return ({
        message: "success",
        data: datas,
        statusCode: statusCode
    })
}

module.exports = {
    SuccessMessage
}