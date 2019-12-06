const fs = require('fs');
const path = require('path');

module.exports = {
  cachedData: {},
  isFreshData(key) {
    if (!(key in this.cachedData)) {
      return false;
    }

    const { dtime } = this.cachedData[key];
    const { mtime } = fs.statSync(this.getPathData(key));

    return mtime < dtime;
  },
  getPathData(key) {
    return path.join(__dirname, `data/${key}.json`);
  },
  getData(key) {
    if (!this.isFreshData(key)) {
      const data = fs.readFileSync(this.getPathData(key), { encoding: 'utf8' });

      this.cachedData[key] = {
        data: JSON.parse(data),
        dtime: new Date(),
      };
    }

    return this.cachedData[key].data;
  },
  getDataById(key, id) {
    return this.getData(key).find(({ _id = '' }) => _id === id);
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
