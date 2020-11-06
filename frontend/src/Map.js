import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// url to a valid topojson file
const geoUrl =
  "https://servicodados.ibge.gov.br/api/v2/malhas/?formato=application/json&resolucao=2";
//   "https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json";
const queimadasApiUrl =
  "https://cors-anywhere.herokuapp.com/https://queimadas.dgi.inpe.br/queimadas/dados-abertos/api/focos?pais_id=33";

const Map = () => {
  const [loading, setLoading] = useState(true);
  const [statesInfo, setStatesInfo] = useState({});

  function getData() {
    fetch("fires.json")
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        setStatesInfo(JSON.parse(response));
        setLoading(false);
      })
      .catch((err) => console.log("ERROR!", err));
  }

  function handleStateClick(state) {
    console.log(state);
  }

  // Construtor
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <h1>Carregando!</h1>;
  else {
    return (
      <div id="map">
        <ComposableMap viewBox="190 0 510 480" preserveAspectRatio="xMidYMin slice" projection="geoMercator" style={{
            width: 500,
            // display:'flex',
            // alignItems:'center',
            // justifyContent:'center',
            // padding:30
        }} projectionConfig={{
            rotate: [58, 20, 0],
            scale: 600
        }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const state = statesInfo.find(
                  (x) => x.id == geo.properties.codarea
                );
                const color = state.color;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: color && isNaN(color) ? color : "#D5D5D5",
                        stroke: null,
                        strokeWidth: 0,
                        outline: "none",
                      },
                      hover: {
                        fill: "#CFD8DC",
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FFFFFF",
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none",
                      },
                    }}
                    onClick={() => handleStateClick(state)}
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

export default Map;
