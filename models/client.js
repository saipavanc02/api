const db = require('../database');

class Client {
  static createClient(name, companyId, userId, email, phone, callback) {
    db.run(
      'INSERT INTO Clients (name, company_id, user_id, email, phone) VALUES (?, ?, ?, ?, ?)',
      [name, companyId, userId, email, phone],
      callback
    );
  }

  static updateClientField(clientId, fieldName, fieldValue, callback) {
    const query = `UPDATE Clients SET ${fieldName} = ? WHERE id = ?`;
    db.run(query, [fieldValue, clientId], callback);
  }
}

module.exports = Client;
