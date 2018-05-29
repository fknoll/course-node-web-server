const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const os = require("os");

var app = express();

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.originalUrl}`;
  console.log(log);

  fs.appendFile('server.log', log + os.EOL, (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('helperGetCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('helperScreamIt', text => '*** ' + text.toUpperCase() + ' ***');
// hbs.registerHelper('screamIt', (text) => {
//   return text.toUpperCase();
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: ':LUMOZ: Home Page',
    welcomeMessage: 'Welcome to our WebSite'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: ':LUMOZ: About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
