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
/**
 * Cors habilita al servidor recibir peticiones desde otros servidores: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * Si no se define tendríamos un error de Cross-Origin
 */
app.use(cors());

routes.initRoutes(app);
app.listen(port, () => console.log('Running on localhost: ' + port));
