const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');

const app = express();
const port = process.env.PORT | 3000;

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let userIndex = 0;
let users = {};

app.get('/', (req, res) => {
    res.render('index.pug');
});

app.get('/create', (req, res) => {

});

app.listen(port);