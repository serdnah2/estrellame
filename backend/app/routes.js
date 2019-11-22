const starsApi = require('./api/stars/stars');
const _initRoutes = (app) => {
    app.get('/stars', starsApi.getStars);
};

exports.initRoutes = _initRoutes
