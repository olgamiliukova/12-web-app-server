const express = require('express');
const path = require('path');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

// register static
app.use(express.static(path.join(__dirname, 'public')));

// register dynamic
routes.init(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
