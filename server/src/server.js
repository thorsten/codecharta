var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

/**
 * ccsh sonarimport \<url of server> \<project id>
 */
app.post('/analysis/import/sonar', function (req, res) {
    // TODO get params
    // TODO sonar code
    // TODO async (returns id)
    res.json({test:"hello"});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});