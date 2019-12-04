const fs = require('fs');
const path = require('path');

module.exports = {
  cachedData: {},
  getData(key) {
    if (!(key in this.cachedData)) {
      const file = path.join(__dirname, `data/${key}.json`);
      const data = fs.readFileSync(file, { encoding: 'utf8' });

      this.cachedData[key] = JSON.parse(data);
    }

    return this.cachedData[key];
  },
  getDataById(key, id) {
    return this.getData(key).reduce((model, next) => {
      const { _id = '' } = next;
      if (_id === id) {
        return next;
      }

      return model;
    }, null);
  },
  getCards() {
    return this.getData('cards');
  },
  getCardById(id) {
    return this.getDataById('cards', id);
  },
  getUsers() {
    return this.getData('users');
  },
  getUserById(id) {
    return this.getDataById('users', id);
  },
};
