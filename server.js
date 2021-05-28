const express = require("express");

const router = express.Router();
//const swaggerUi = require ("swagger-ui-express");
//const swaggerDoc = require ("./../swagger/swagger.json");
//const cors = require("cors");
const Controller = require("./src/controller");
const Config = require("./config/config");
const Utils = require("./src/utils");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());

let port = process.env.PORT || 3000;

app.set("port", port);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use('/context', router);

router.post("/insert", (req, res) => Controller.insert(req).then((data) => {
    console.log('Document inserted');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    res.send(json);
}));

router.get("/find/:user", (req, res) => Controller.find(req).then((data) => {
    console.log('Informations found with success');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    res.send(json);
}));

// ----------------- Ping to check if api alive ---------------------
router.get("/ping", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log('I\'m the final-project-api and i\' still alive !');
    res.end(JSON.stringify({ message: 'I\'m the final-project-api and i\'m still alive !' }));
})

app.listen(app.get("port"), () => {
    console.log('App is now running on port ' + app.get("port"));
});