#!/root/.nvm/versions/node/v12.18.3/bin/node

const express = require('express')
const app = express()
const port = 8080
var axios = require('axios')
var cors = require('cors');
app.use(cors());

app.get('/focos/:pais/:estado', async (req, res) => {
    var config = {
        method: 'get',
        url: `http://queimadas.dgi.inpe.br/queimadas/dados-abertos/api/focos/count?pais_id=${req.params.pais}&estado_id=${req.params.estado}`,
        headers: { }
    }
    
    try {
        console.log(config);
        const data = await axios(config)
        res.send(data.data)
    } catch (error) {
        console.log(error.message); 
        res.send(error.message);
    }
});

app.get('/noticias', async (req, res) => {

    const url = 'http://newsapi.org/v2/everything?' +
          `q=${encodeURIComponent('"queimadas" "brasil" -bolsonaro -trump -biden')}&` +
          'language=pt&' +
          'pageSize=8&' + 
          'sortBy=popularity&' +
          'apiKey=a36ce82bedf74d778205c626a64e247d';

    var config = {
        method: 'get',
        url,
        headers: { }
    }
    
    try {
        console.log(config);
        const data = await axios(config)
        res.send(data.data)
    } catch (error) {
        console.log(error.message); 
        res.send(error.message);
    }
});

app.listen(port, 'localhost', () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
