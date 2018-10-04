const express = require('express');
const expressMongoDb = require('express-mongo-db');

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(expressMongoDb('mongodb://localhost/tiojolo'));

app.get('/', (req, res) => {
    req.db.collection('produtos').find().toArray((erro, dados) => {
        res.render('home', {'produtos': dados});
    });
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