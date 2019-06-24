const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');

const middleware = (request, response, next) => {
  if (!request.query.age) {
    return response.redirect('/');
  }

  return next();
};

app.get('/', (request, response) => {
  return response.render('home');
});

app.post('/check', (request, response) => {
  const { age } = request.body;

  if (age >= 18) {
    return response.redirect(`/major?age=${age}`);
  } else {
    return response.redirect(`/minor?age=${age}`);
  }
});

app.get('/major', middleware, (request, response) => {
  return response.render('major', { age: request.query.age });
});

app.get('/minor', middleware, (request, response) => {
  return response.render('minor', { age: request.query.age });
});

app.listen(3000);
