const router = require('express').Router();
const dataProvider = require('../data-provider');

router.get('/cards', (req, res) => {
  const cards = dataProvider.getCards();

  res.send(cards);
});

router.get('/cards/:id', (req, res) => {
  const { id } = req.params;
  const card = dataProvider.getCardById(id);

  if (!card) {
    res.status(404);
    res.send({
      message: `No card with this id: ${id}`,
    });

    return;
  }

  res.send(card);
});

module.exports = router;
