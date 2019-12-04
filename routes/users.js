const router = require('express').Router();
const dataProvider = require('../data-provider');

router.get('/users', (req, res) => {
  const users = dataProvider.getUsers();

  res.send(users);
});

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = dataProvider.getUserById(id);

  if (!user) {
    res.status(404);
    res.send({
      message: `No user with this id: ${id}`,
    });

    return;
  }

  res.send(user);
});

module.exports = router;
