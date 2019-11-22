const starsApi = require('./api/stars/stars');
const userStarsApi = require('./api/user_stars/userStars');
const authApi = require('./api/authentication/login');

/**
 * Agregamos las rutas de la API
 */
const _initRoutes = (app) => {
    app.get('/stars', starsApi.getStars);
    app.get('/stars/:userId/:status', userStarsApi.getUserStars);
    app.post('/stars', starsApi.addStars);
    app.post('/login', authApi.postAuth);
    app.get('/users', authApi.getUsers);
};

exports.initRoutes = _initRoutes
