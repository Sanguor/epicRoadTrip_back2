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
    },

    getRestaurants: function (tab){
        let result = [];
        let i = 0;
        let y = 0;
        for(i = 0; i < tab.length; i++){
            if(tab[i].category == "RESTAURANT") {
                result[y] = {
                    nom: tab[i].name,
                    coordinates: tab[i].geoCode
                }
                y++;
            }
        }
        return result;
    },

    getSights: function (tab){
        let result = [];
        let i = 0;
        let y = 0;
        for(i = 0; i < tab.length; i++){
            if(tab[i].category == "SIGHTS") {
                result[y] = {
                    nom: tab[i].name,
                    coordinates: tab[i].geoCode
                }
                y++;
            }
        }
        return result;
    },

    getSafetyScores: function (tab){
        let result = [];
        let i = 0;
        for(i = 0; i < tab.length; i++){
            result[i] = {
                nom: tab[i].name,
                coordinates: tab[i].geoCode,
                safety_score: tab[i].safetyScores
            }
        }
        return result;
    }
}