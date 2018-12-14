module.exports = class paymentDao {
  constructor(db) {
    this._db = db;
  }

  add({ value }) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        INSERT INTO payment (
          value
        ) VALUES (?)
        `, [
          value
        ],
        error => {
          if (error) {
            console.error(error);
            return reject('Could not add the payment');
          }

          return resolve();
        }
      );
    });
  }

  update({ id, value }) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE payment SET
          value = ?,
        WHERE id = ?
        `, [
          value,
          id
        ],
        error => {
          if (error) {
            console.error(error);
            return reject('Could not update the payment');
          }

          return resolve();
        }
      );
    });
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM payment WHERE id = ?',
        id,
        (error, result) => {
          if (error) {
            console.error(error);
            return reject('Could not execute the payment query');
          }

          return resolve(result[0]);
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM payment',
        (error, payments) => {
          if (error) {
            console.error(error);
            return reject('Could not execute the payment query');
          }

          return resolve(payments);
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        DELETE FROM payment
        WHERE id = ?
      `,
        id
        ,
        error => {
          if (error) {
            console.error(error);
            return reject('Could not delete the payment');
          }

          return resolve();
        });
    });
  }
}
