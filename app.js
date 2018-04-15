const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');

const app = express();
const port = process.env.PORT | 3000;

app.use('/', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

let userIndex = 0;
let users = [{uid: 0, name:'chaika', email:'a@a.com', age: 14}];

//{uid: 0, name:'chaika', email:'a@a.com', age: 14},
//{uid: 1, name:'chaika', email:'a@a.com', age: 14},
//{uid: 2, name:'chaika', email:'a@a.com', age: 14},
//{uid: 3, name:'chaika', email:'a@a.com', age: 14}

app.get('/', (req, res) => {
    res.render('index.pug');
});

app.get('/create', (req, res) => {
    res.render('create-user');
});

app.post('/create', (req, res) => {
    let user = {
        uid: userIndex,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    userIndex++;

    users.push(user);

    res.redirect('/userlist');
});

app.get('/userlist', (req, res) => {

    console.log(users);


    res.render('user-listing', {
        userList: users
    });
});

app.get('/edit/:userid', (req, res) => {
    console.log(users);
    console.log(req.params.userid);

    let elementPosition;

    for(let i = 0; i <= users.length; i++){
        if(users[i].uid == req.params.userid){
            elementPosition = i;
            break;
        }
    }

    // let elementPosition = users.map((x) => {return x.uid}).indexOf(req.params.userid);
    let user = users[elementPosition];

    users.splice(elementPosition, 1);

    console.log(user);

    res.render('edit-user', {
        editUser: user
    });
});



app.listen(port);