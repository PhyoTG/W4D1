var express = require('express');
var router = express.Router();
var bodyparser = require("body-parser");
var cookieParser = require('cookie-parser');

router.use(bodyparser.urlencoded());
router.use(cookieParser());

router.get('/', (req, res)=> {
    console.log("req.cookies");
    console.log(req.cookies);
    res.render("cookie",{ cookies: req.cookies.list});
});

router.post('/', (req, res)=> {
    let list = req.cookies.list;
    if(list){
        list.push({ key: req.body.key, value: req.body.value});
    }
    else{
        list = [];
        list.push({ key: req.body.key, value: req.body.value});
    }
    res.cookie("list",list);

    res.redirect("/cookies");
});

module.exports = router;
