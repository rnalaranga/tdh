const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', routes);

// 404
app.use((req, res) => {
  res.status(404).render('404', { page: '404' });
});

// Vercel එකේදී error එකක් එන එක නවත්තන්න local run වෙනකොට විතරක් listen කරනවා
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🔧 TD HANDYMAN — Server running at http://localhost:${PORT}\n`);
  });
}

// Vercel එකට app එක හඳුන්වා දීමට අනිවාර්යයෙන්ම export කරන්න ඕනේ
module.exports = app;
