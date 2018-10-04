const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(expressMongoDb('mongodb://localhost/tiojolo'));
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    req.db.collection('produtos').find().toArray((erro, dados) => {
        res.render('home', {'produtos': dados});
    });
});

app.get('/admin', (req, res) => {
    res.render('admin', {resposta: false});
});

app.post('/admin', (req, res) => {
    req.db.collection('produtos').insert(req.body, (erro) => {
        res.render('admin', {resposta: true});
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