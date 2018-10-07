const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(expressMongoDb('mongodb://rodrigo:r83789159@ds051853.mlab.com:51853/suplementos'));
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    req.db.collection('produtos').find().toArray((erro, dados) => {
        res.render('home', {'produtos': dados});
    });
});

app.get('/admin', (req, res) => {
    res.render('admin', {resposta: ""});
});

app.post('/admin', (req, res) => {
    let produto = {
        imagem: req.body.imagem,
        // preco: req.body.preco,
        descricao: req.body.descricao
    }
    
    if(!produto.imagem || !produto.descricao){
        res.status(400).render('admin', {resposta: "Preencha todos os campos"});
        return;
    }

    req.db.collection('produtos').insert(produto, (erro) => {
        res.status(201).render('admin', {resposta: "Deu bom"});
    });
});

app.get('/admin/lista', (req, res) => {
    req.db.collection('produtos').find().toArray((erro, dados) => {
        res.render('admin-lista', {'produtos': dados});
    });
});

app.post('/admin/lista', (req, res) => {
    req.db.collection('produtos').remove({_id: ObjectID(req.body.id)}, () => {
        req.db.collection('produtos').find().toArray((erro, dados) => {
            res.render('admin-lista', {'produtos': dados});
        });
    });
});

app.get('/quem-eramos', (req, res) => {
    res.render('quem-eramos');
});

app.get('/quem-somos', (req, res) => {
    res.render('quem-somos');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor inicializado');
});