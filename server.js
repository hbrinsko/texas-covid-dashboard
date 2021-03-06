const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/texas-covid-dashboard'));
app.use(cors());

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/texas-covid-dashboard/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 8080);