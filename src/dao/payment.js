const sqlUtils = require('../utils/sql');

module.exports = class paymentDao {
  constructor(db) {
    this._db = db;    
  }

  create(payment) {
    return new Promise((resolve, reject) => {

      this._db.run(`
        INSERT INTO payment (
          ${sqlUtils.prepareInsert(payment)}
        ) VALUES (?, ?, ?, ?, ?)
        `, [
          ...Object.values(payment)
        ],
        function(error) {
          if (error)
            return reject(error);

          return resolve(this.lastID);
        }
      );
    });
  }

  update(id, payment) {
    return new Promise((resolve, reject) => {
      delete payment.id;

      this._db.run(`
        UPDATE payment SET
          ${sqlUtils.prepareUpdate(payment)}
        WHERE id = ?
        `, [ 
          ...Object.values(payment), id
        ],
        error => {
          if (error)
            return reject(error);

          return resolve(payment);
        }
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM payment',
        (error, results) => {
          if (error)
            return reject(error);

          return resolve(results || []);
        }
      );
    });
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM payment WHERE id = ?',
        id,
        (error, result) => {
          if (error)
            return reject(error);

          return resolve(result[0] || {});
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._db.run(
        'DELETE FROM payment WHERE id = ?',
        id,
        error => {
          if (error)
            return reject(error);

          return resolve();
        }
      );
    });
  }
}
