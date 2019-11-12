const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hola mundo'));

app.get('/estrellas', (req, res) => res.send('página de estrellas'));

app.listen(port, () => console.log('Running on localhost: ' + port));