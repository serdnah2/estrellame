const starsApi = require('./api/stars/stars');
const _initRoutes = (app) => {
    app.get('/stars', starsApi.auth);
};

exports.initRoutes = _initRoutes
