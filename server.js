const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cors = require('cors')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

  // if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});