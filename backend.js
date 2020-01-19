var express = require('express');
var busboyBodyParser = require('busboy-body-parser');
var app = express();

app.use(busboyBodyParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });

var Movie = mongoose.model('movie', new mongoose.Schema({
    title: String,
    img: String,
    description: String
}));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    obradiZahtjev(res);
});

function obradiZahtjev(res) {
    Movie.find({}, function (err, movies) {
        res.render('home', { movies: movies });
    });
}

app.get('/movie', function(req,res) {
    res.render('movie');
});

app.get('/addMovie', function (req,res) {
    res.render('add-movie');
});

app.post('/addMovie', function (req, res) {
    Movie.insertMany([{ ...req.body, img: Buffer.from(req.files.img.data).toString('base64') }], function () {
        res.redirect('/');
    });
});

app.get('*', function (req, res) {
    res.send("Sorry, page not found!");
});

var port = 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

