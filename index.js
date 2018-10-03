const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/quem-eramos', (req, res) => {
    res.render('quem-eramos');
});

app.get('/quem-somos', (req, res) => {
    res.render('quem-somos');
});

app.listen(3000, () => {
    console.log('Servidor inicializado.');
});