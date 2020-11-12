#!/root/.nvm/versions/node/v12.18.3/bin/node

var axios = require('axios')
var fs = require("fs");

const brazil_states_info = [
    { name: "MATO GROSSO", id: 51 },
    { name: "GOIÁS", id: 52 },
    { name: "DISTRITO FEDERAL", id: 53 },
    { name: "RONDÔNIA", id: 11 },
    { name: "ACRE", id: 12 },
    { name: "AMAZONAS", id: 13 },
    { name: "RORAIMA", id: 14 },
    { name: "PARÁ", id: 15 },
    { name: "AMAPÁ", id: 16 },
    { name: "TOCANTINS", id: 17 },
    { name: "MARANHÃO", id: 21 },
    { name: "PIAUÍ", id: 22 },
    { name: "CEARÁ", id: 23 },
    { name: "PARAÍBA", id: 25 },
    { name: "RIO GRANDE DO NORTE", id: 24 },
    { name: "PERNAMBUCO", id: 26 },
    { name: "ALAGOAS", id: 27 },
    { name: "SERGIPE", id: 28 },
    { name: "BAHIA", id: 29 },
    { name: "MINAS GERAIS", id: 31 },
    { name: "ESPÍRITO SANTO", id: 32 },
    { name: "RIO DE JANEIRO", id: 33 },
    { name: "SÃO PAULO", id: 35 },
    { name: "PARANÁ", id: 41 },
    { name: "SANTA CATARINA", id: 42 },
    { name: "RIO GRANDE DO SUL", id: 43 },
    { name: "MATO GROSSO DO SUL", id: 50 }
]

function getState(state) {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await axios("http://localhost:8080/focos/33/" + state['id']);
            let color = "";

            if (data.data.Brasil < 10) {
              color = "#BEFF59";
            } else if (data.data.Brasil <= 101) {
              color = "#F6EE89";
            } else if (data.data.Brasil <= 301) {
              color = "#F2DE52";
            } else if (data.data.Brasil <= 501) {
              color = "#FFC766";
            } else if (data.data.Brasil <= 701) {
              color = "#EB7946";
            } else {
              color = "#FF0020";
            }

            resolve({...state, fires: data.data.Brasil, color});
        } catch (error) {
            reject(error.message);
        }
    });
}

async function getFiresData() {
    try {
        const firesData = await Promise.all(brazil_states_info.map((state) => getState(state)));
        const jsonFiresData = JSON.stringify(firesData);

        fs.writeFile("/var/www/queimadas.rafaelherbert.com.br/fires.json", jsonFiresData, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });

    } catch (error) {
        console.log(error);        
    }
}

getFiresData();

