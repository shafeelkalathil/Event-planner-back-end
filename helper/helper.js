
exports.deliverResponse = (res, httpStatus = 200, data, msg, meta = {}) => {    
    if (httpStatus === 200) {
        //Default reponse in case of 200
        const response = {
            success: true,
            error_code: 0,
            message: 'Success'
        };
        if (data) {
            response.result = data;
        }
        if (msg) {
            response.error_code = msg.error_code;
            response.message = msg.error_message;
        }
        response.meta = meta;
        res.status(httpStatus).json(response)
    } else {
        console.log(data)
        //Default reponse in case of codes other than 200
        const errorResponse = {
            success: false,
            result: {},
            error_code: 100,
            message: 'Somwthing went wrong'
        };
        errorResponse.result = data;
        if (msg) {
            errorResponse.error_code = msg.error_code;
            errorResponse.message = msg.error_message;
        }
        errorResponse.meta = meta;
        res.status(httpStatus).json(errorResponse)
    }
}
