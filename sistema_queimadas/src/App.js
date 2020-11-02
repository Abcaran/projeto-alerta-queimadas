import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// url to a valid topojson file
const geoUrl =
    // "https://servicodados.ibge.gov.br/api/v2/malhas/?formato=application/json&resolucao=2";
  "https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json";
const queimadasApiUrl =
  "https://cors-anywhere.herokuapp.com/https://queimadas.dgi.inpe.br/queimadas/dados-abertos/api/focos?pais_id=33";

const App = () => {

  const [loading, setLoading] = useState(true);
  const [statesId, setStatesId] = useState(
    {
        "MATO GROSSO": 51,
        "GOIÁS": 52,
        "DISTRITO FEDERAL": 53,
        "RONDÔNIA": 11,
        "ACRE": 12,
        "AMAZONAS": 13,
        "RORAIMA": 14,
        "PARÁ": 15,
        "AMAPÁ": 16,
        "TOCANTINS": 17,
        "MARANHÃO": 21,
        "PIAUÍ": 22,
        "CEARÁ": 23,
        "PARAÍBA": 25,
        "RIO GRANDE DO NORTE": 24,
        "PERNAMBUCO": 26,
        "ALAGOAS": 27,
        "SERGIPE": 28,
        "BAHIA": 29,
        "MINAS GERAIS": 31,
        "ESPÍRITO SANTO": 32,
        "RIO DE JANEIRO": 33,
        "SÃO PAULO": 35,
        "PARANÁ": 41,
        "SANTA CATARINA": 42,
        "RIO GRANDE DO SUL": 43,
        "MATO GROSSO DO SUL": 50,
      }
  );

  async function getData() {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: 'cors'
        };

        await Promise.all(
            Object.entries(statesId).map((row) => {
                console.log(row);
                return Promise.all([
                    fetch("http://localhost:8080/focos/33/" + row[1], requestOptions)
                    .then(response => response.text())  
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error))
                    , row[0]]);
            })
        )
        .then(res => Promise.all(res))
        .then(res => Promise.all(res.map(async row => {
            row[0] = await row[0].text();
            row[0] = JSON.parse(row[0]);
            row[0] = row[0].Brasil;
            return row;
        })))
        .then(res => {
            res.forEach(row => {
                console.log(row);
                if (row[0] <= 1) {
                    console.log('colored!FEE464');
                    statesId[row[1]] = "#FEE464";
                } else if (row[0] <= 101) {
                    console.log('colored!FEC964');
                    statesId[row[1]] = "#FEC964";
                } else if (row[0] <= 201) {
                    console.log('colored!FF7D40');
                    statesId[row[1]] = "#FF7D40";
                } else {
                    console.log('colored!FF0000');
                    statesId[row[1]] = "#FF0000";
                }
            });

            setLoading(false);
            console.log(statesId);
            setStatesId(statesId);
        })
        .catch(err => {
            console.log('Deu totalmente ruim.', err);
        });
  }

  // Construtor
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <h1>Carregando!</h1>;
  else {
    return (
      <div id="map">
        <ComposableMap width={500} height={500}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                  const color = statesId[geo.properties.nome.toUpperCase()];
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: color && isNaN(color) ? color : "#D5D5D5",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#CFD8DC",
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FF5722",
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                    onClick={(x) => console.log(x)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    );
  }
};

export default App;
