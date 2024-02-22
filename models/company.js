const db = require('../database');

class Company {
  static getCompaniesByEmployeeRange(minEmployees, maxEmployees, callback) {
    db.all('SELECT * FROM Companies WHERE employees >= ? AND employees <= ?', [minEmployees, maxEmployees], callback);
  }
}

module.exports = Company;
