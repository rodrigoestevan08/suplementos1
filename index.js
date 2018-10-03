const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    fs.readFile('produtos.csv', {encoding: 'utf8'}, (erro, dados) => {
        let linhas = dados.split('\n');
        let produtos = [];

        for(let linha of linhas){
            let colunas = linha.split(';');
            
            produtos.push({
                imagem: colunas[0],
                descricao: colunas[1],
                preco: colunas[2]
            });
        }

        res.render('home', {'produtos': produtos});
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