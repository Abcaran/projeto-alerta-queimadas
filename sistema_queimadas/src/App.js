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
  const [statesInfo, setStatesInfo] = useState({});

  function getData() {
      fetch("fires.json")
        .then(response => response.text())
        .then(response => {
            console.log(response);
            setStatesInfo(JSON.parse(response));
            setLoading(false);
        })
        .catch(err => console.log("ERROR!", err));
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
                  const state = statesInfo.find(x => x.name === geo.properties.nome.toUpperCase())
                  const color = state.color;
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
