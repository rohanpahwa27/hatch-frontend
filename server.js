var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/*", (req, res) => {
    return res.sendFile(__dirname+'/dist/index.html');
});

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});

app.listen(process.env.PORT || 8080, () => console.log(`Server is listening on port ${process.env.PORT || 8080}`));