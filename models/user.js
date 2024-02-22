const db = require('../database');

class User {
  static getAllUsers(callback) {
    db.all('SELECT * FROM Users', callback);
  }

  static updateUser(id, username, callback) {
    db.run('UPDATE Users SET username = ? WHERE id = ?', [username, id], callback);
  }

  static createUser(username, email, callback) {
    db.run('INSERT INTO Users (username, email) VALUES (?, ?)', [username, email], callback);
  }
}

module.exports = User;
