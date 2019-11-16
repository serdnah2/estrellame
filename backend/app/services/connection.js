const mariadb = require('mariadb');
const _pool = mariadb.createPool({host: '127.0.0.1', user: 'root', password: 'admin', database: 'starme_db'});

exports.pool = _pool;
