const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require("body-parser");
var session = require('express-session');

app.use(bodyparser.urlencoded());
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use(session({
    secret: "W4D1"
}));

const date = new Date();
const hour = date.getHours();

app.get('/', function(req, res) {
    if (hour >= 6 && hour <= 18) {
        res.sendFile(path.join(__dirname, '/index.html'));
    } else {
        res.sendFile(path.join(__dirname, '/index-.html'));
    }
}); 

app.post('/result', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    req.session.name = name;
    req.session.age = age;
    res.redirect('/output');
});

app.get('/output', (req, res) => {
 res.send(`Welcome ${req.session.name} with the age of ${req.session.age}`);
});
app.listen(3000);