const express = require("express");
import router from '../src/router.js';

//const swaggerUi = require ("swagger-ui-express");
//const swaggerDoc = require ("./../swagger/swagger.json");
//const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());

let port = process.env.PORT || 3000;

app.set("port", port);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/epicroadtrip', router);



app.listen(app.get("port"), () => {
    console.log('App is now running on port ' + app.get("port"));
});