const mariadbPool = require('../../services/connection');
/**
 * API para devolver todos los tipos de estrellas
 */
const _getStars = (req, res, next) => {
    mariadbPool.pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM STARS_TBL")
                .then((rows) => {
                    res.status(200).send({ data: rows });
                    next();
                    conn.end();
                })
                .catch(err => conn.end());

        }).catch(err => {});
};

/**
 * API para enviar una estrella
 */
const _addStars = (req, res, next) => {
    let data = req.body || '';
    mariadbPool.pool.getConnection()
        .then(conn => {
            conn.query(`INSERT INTO USERS_STARS_TBL(RECEIVER_ID, SENDER_ID, STAR_ID, DESCRIPTION) VALUES (?, ?, ?, ?)`, [data.RECEIVER_ID, data.SENDER_ID, data.STAR_ID, data.DESCRIPTION])
                .then(() => {
                    res.status(200).send({ success: true });
                    next();
                    conn.end();
                })
                .catch(err => conn.end());

        }).catch(err => {});
};

exports.getStars = _getStars;
exports.addStars = _addStars;
