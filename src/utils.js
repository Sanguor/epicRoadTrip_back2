module.exports = {

    parseData: function (data) {
        let arrayOfData = [];

        for (json of data) {
            arrayOfData.push([json['date'], json['mood']]);
        }

        
        return (arrayOfData);
    },


    plot: function (req) {
        var plotly = require('plotly')("Sanguor", "z08jlAAKRVZvjxK1ttkX");


        var data = [{ x: [0, 1, 2], y: [3, 2, 1], type: 'bar' }];
        var layout = { fileopt: "overwrite", filename: "simple-node-example" };

        plotly.plot(data, layout, function (err, msg) {
            if (err) return console.log(err);
            console.log(msg);
        });
        return ({ code_http: 200, message: "ok" });
    },



    getError: function (err) {
        if (!err.code_http)
            return {
                message: err.toString(),
                code_http: 500,
            }
        return err;
    }
}