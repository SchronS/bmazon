var verify = require('./api/verify');
var cookieParser = require('cookie-parser');
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;

app.listen(port);

console.log('Listening on port: ' + port);

app.use(cookieParser());
app.use(express.static('./'));
app.use(express.static('./mvc'));
app.use(express.static('./mvc/controllers'));
app.use(express.static('./mvc/models'));
app.use(express.static('./mvc/views'));
app.use(express.static('./mvc/init'));
app.use(express.static('./views/css'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.engine('html', require('ejs').renderFile);

app.use('\*', function (req, res, next) {
    verify.verify(req.cookies.access_token, req, res, next);
});
var routes = require('./api/routes/routes');

routes(app);