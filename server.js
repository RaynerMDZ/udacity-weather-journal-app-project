// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/addData', (req, res) => {
    projectData = req.body;
    res.sendStatus(200);
});


// Setup Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
