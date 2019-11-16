const starsApi = require('./api/stars/stars');
const userStarsApi = require('./api/user_stars/userStars');
const authApi = require('./api/authentication/login');

const _initRoutes = (app) => {
    app.get('/stars', starsApi.getStars);
    app.get('/user-stars', userStarsApi.getUserStars);
    app.post('/login', authApi.postAuth);
};

exports.initRoutes = _initRoutes
