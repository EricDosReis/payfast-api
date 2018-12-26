module.exports = class paymentDao {
  constructor(db) {
    this._db = db;
  }

  add({ type, value, currency, description }) {
    return new Promise((resolve, reject) => {

      this._db.run(`
        INSERT INTO payment (
          type,
          value,
          currency,
          description
        ) VALUES (?, ?, ?, ?)
        `, [
          type, value, currency, description
        ],
        function(error) {
          if (error)
            return reject(error);

          return resolve(this.lastID);
        }
      );
    });
  }

  update({ id, type, value, currency, description }) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE payment SET
          type = ?,
          value = ?,
          currency = ?,
          description = ?
        WHERE id = ?
        `, [ 
          type, value, currency, description, id
        ],
        error => {
          if (error)
            return reject(error);

          return resolve();
        }
      );
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM payment',
        (error, payments) => {
          if (error)
            return reject(error);

          return resolve(payments || []);
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
