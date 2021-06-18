import express from 'express';
import * as pjson from "./../package.json";

const Controller = require("./src/controller");
const router = express.Router();

// GET

// Retrieve a single user
router.get("/users/:user", (req, res) => Controller.findSingleUser(req.params).then((data) => {
    console.log('Informations found with success');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    delete json.code_http;
    res.send(json);
}));


// Retrieve all users
router.get("/users", (req, res) => Controller.findManyUsers(req.params).then((data) => {
    console.log('Informations found with success');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    delete json.code_http;
    res.send(json);
}));


//
router.get("/apis/:api_name", (req, res) => Controller.callApi(req.params).then((data) => {
    console.log('Informations found with success');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    delete json.code_http;
    res.send(json);
}));


//POST

// create single user
router.post("/users", (req, res) => Controller.insertSingleUser(req.body).then((data) => {
    console.log('Document inserted');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    delete json.code_http;
    res.send(json);
}));



// DELETE

// Delete single user
router.delete("/users/:user", (req, res) => Controller.deleteSingleUser(req.params).then((data) => {
    console.log('Document deleted');
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}).catch((err) => {
    let json = Utils.getError(err);
    console.log('error', json.message);
    res.status(json.code_http);
    delete json.code_http;
    res.send(json);
}));


// PING the api to check if it is still alive
router.get("/ping", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log('I\'m the final-project-api and i\' still alive !');
    res.end(JSON.stringify({ message: `I\'m the ${pjson.name} api version ${pjson.version} and i\'m still alive !` }));
});


//to call it in server file
export default router;
