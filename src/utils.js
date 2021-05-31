module.exports = {
    getError: function (err) {
        message = err.message ? err.message : err.toString();
        if (!err.code_http) {
            return {
                message: message,
                code_http: 500,
            }
        }
        return err;
    }
}