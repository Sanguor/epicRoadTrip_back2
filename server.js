const express = require("express");
const router = express.Router();
//const swaggerUi = require ("swagger-ui-express");
//const swaggerDoc = require ("./../swagger/swagger.json");
//const cors = require("cors");
const Controller = require("./src/controller");
const Travel_controller = require("./src/travel_controller");
// const Config = require("./config/config");
const Utils = require("./src/utils");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors());

let port = process.env.PORT || 3000;

app.set("port", port);

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/epicroadtrip', router);

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

/// ---------------- Travel routes ----------------------------------
router.get("/pois", (req, res) => {
    Travel_controller.searchPointsOfInterest(req.body)
    .then((data) => {
        console.log(data);
        res.status(200).send(Utils.getNamesAndCoordinates(data.result.data));        
    })
    .catch((err) => {
        res.status(404).send(err);
    })
});

router.get("/restaurants", (req, res) => {
    Travel_controller.searchPointsOfInterest(req.body)
    .then((data) => {
        console.log(data);
        res.status(200).send(Utils.getRestaurants(data.result.data));        
    })
    .catch((err) => {
        res.status(404).send(err);
    })
});

router.get("/sights", (req, res) => {
    Travel_controller.searchPointsOfInterest(req.body)
    .then((data) => {
        console.log(data);
        res.status(200).send(Utils.getSights(data.result.data));        
    })
    .catch((err) => {
        res.status(404).send(err);
    })
});

router.get("/toursandactivities", (req, res) => {
    Travel_controller.searchToursAndActivities(req.body)
    .then((data) => {
        console.log(data);
        res.status(200).send(Utils.getNamesAndCoordinates(data.result.data));        
    })
    .catch((err) => {
        res.status(404).send(err);
    })
});

router.get("/locationsafety", (req, res) => {
    Travel_controller.LocationSafety(req.body)
    .then((data) => {
        console.log(data);
        res.status(200).send(Utils.getSafetyScores(data.result.data));        
    })
    .catch((err) => {
        res.status(404).send(err);
    })
});
// ----------------- Ping to check if api alive ---------------------
router.get("/ping", (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log('I\'m the final-project-api and i\' still alive !');
    res.end(JSON.stringify({ message: 'I\'m the epic-road-trip-api and i\'m still alive !' }));
});

app.listen(app.get("port"), () => {
    console.log('App is now running on port ' + app.get("port"));
});