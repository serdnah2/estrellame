const mariadb = require('mariadb');
const _pool = mariadb.createPool({host: '127.0.0.1', user: 'root', password: '', database: 'users'});

exports.pool = _pool;
