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
    },

    getNamesAndCoordinates: function (tab){
        let result = [];
        let i = 0;
        for(i = 0; i < tab.length; i++){
            result[i] = {
                nom: tab[i].name,
                coordinates: tab[i].geoCode
            }
        }
        return result;
    }
}