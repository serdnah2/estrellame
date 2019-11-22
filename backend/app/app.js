const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());

routes.initRoutes(app);
app.listen(port, () => console.log('Running on localhost: ' + port));
