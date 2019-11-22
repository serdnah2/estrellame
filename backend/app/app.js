const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3000;

routes.initRoutes(app);
app.listen(port, () => console.log('Running on localhost: ' + port));
