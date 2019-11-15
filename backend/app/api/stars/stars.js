const mariadbPool = require('../../services/connection');
const _getStars = (req, res, next) => {
    mariadbPool.pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM users")
                .then((rows) => {
                    res.status(200).send({ data: rows });
                    next();
                    conn.end();
                })
                .catch(err => conn.end() );

        }).catch(err => {});
};

exports.getStars = _getStars;
