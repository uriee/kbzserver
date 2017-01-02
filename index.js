var express = require('express');        
var app = express();
var r = require('rethinkdbdash')({
    port: 28015,
    host: 'localhost',
    db: 'kibbutznik'
});


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 4000;
var router = express.Router(); 

var GetById = (kbz = 'test1', id) => {
    return r.table(kbz).get(id).run()
        .then((data) => {return Promise.resolve(data)},
               (err) => {return Promise.reject(new Error ("Error in GetById:" + err))});    
};

router.route('/')
    .get(function(req, res) {
    res.json({ message: 'welcome to an uriee r&d Production' });   
});

router.route('/getbyid/:id')
    .get(function(req, res) {
    Promise.resolve(GetById(kbz='test1',id=req.params.id)).then((data) => {
    console.log(data);
    res.json(data);
	});
});

    app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);

