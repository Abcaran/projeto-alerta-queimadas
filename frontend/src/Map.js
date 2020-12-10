import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// url to a valid topojson file
const geoUrl =
  "https://servicodados.ibge.gov.br/api/v2/malhas/?formato=application/json&resolucao=2";
//   "https://gist.githubusercontent.com/ruliana/1ccaaab05ea113b0dff3b22be3b4d637/raw/196c0332d38cb935cfca227d28f7cecfa70b412e/br-states.json";
const queimadasApiUrl =
  "https://cors-anywhere.herokuapp.com/https://queimadas.dgi.inpe.br/queimadas/dados-abertos/api/focos?pais_id=33";

const Map = (props) => {
  const [loading, setLoading] = useState(true);
  const [statesInfo, setStatesInfo] = useState({});
  const [filter, setFilter] = useState("TODOS");

  const regioesObject = {
    TODOS: [
      "MATO GROSSO",
      "GOIÁS",
      "DISTRITO FEDERAL",
      "RONDÔNIA",
      "ACRE",
      "AMAZONAS",
      "RORAIMA",
      "PARÁ",
      "AMAPÁ",
      "TOCANTINS",
      "MARANHÃO",
      "PIAUÍ",
      "CEARÁ",
      "PARAÍBA",
      "RIO GRANDE DO NORTE",
      "PERNAMBUCO",
      "ALAGOAS",
      "SERGIPE",
      "BAHIA",
      "MINAS GERAIS",
      "ESPÍRITO SANTO",
      "RIO DE JANEIRO",
      "SÃO PAULO",
      "PARANÁ",
      "SANTA CATARINA",
      "RIO GRANDE DO SUL",
      "MATO GROSSO DO SUL",
    ],
    SUDESTE: ["RIO DE JANEIRO", "SÃO PAULO", "ESPÍRITO SANTO", "MINAS GERAIS"],
    SUL: [
      "PARANÁ",
      "SANTA CATARINA",
      "RIO GRANDE DO SUL",
    ],
    NORDESTE: [
      "MARANHÃO",
      "PIAUÍ",
      "CEARÁ",
      "PARAÍBA",
      "RIO GRANDE DO NORTE",
      "PERNAMBUCO",
      "ALAGOAS",
      "SERGIPE",
      "BAHIA",
    ],
    CENTRO_OESTE: ["MATO GROSSO", "GOIÁS", "DISTRITO FEDERAL", "MATO GROSSO DO SUL"],
    NORTE: [
      "RONDÔNIA",
      "ACRE",
      "AMAZONAS",
      "RORAIMA",
      "PARÁ",
      "AMAPÁ",
      "TOCANTINS",
    ],
  };

  function getData() {
    fetch("fires.json")
      .then((response) => response.text())
      .then((response) => {
        setStatesInfo(JSON.parse(response));
        setLoading(false);
      })
      .catch((err) => console.log("ERROR!", err));
  }

  function handleStateClick(state) {
    props.stateClickFunction(state);
  }

  // Construtor
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <h1>Carregando!</h1>;
  else {
    return (
      <>
        <div className="controlGroup">
          Filtro por regiões:{" "}
          <select
            name="regioes"
            id="regioes"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          >
            <option value="TODOS">Todos</option>
            <option value="SUL">Sul</option>
            <option value="SUDESTE">Sudeste</option>
            <option value="CENTRO_OESTE">Centro Oeste</option>
            <option value="NORDESTE">Nordeste</option>
            <option value="NORTE">Norte</option>
          </select>
        </div>
        <ComposableMap
          viewBox="190 0 510 480"
          preserveAspectRatio="xMidYMin slice"
          projection="geoMercator"
          style={{
            width: 500,
            // display:'flex',
            // alignItems:'center',
            // justifyContent:'center',
            // padding:30
          }}
          projectionConfig={{
            rotate: [58, 20, 0],
            scale: 600,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const state = statesInfo.find(
                  (x) => x.id == geo.properties.codarea
                );
                const color = state.color;
                if (regioesObject[filter].includes(state.name)) {
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
                            stroke: "black",
                            strokeWidth: 2,
                            fill: color && isNaN(color) ? color : "#D5D5D5",
                          },
                        }}
                        onClick={() => handleStateClick(state)}
                        onMouseEnter={() => {
                          props.setTooltipContent(
                            `${state.name}: ${state.fires} Focos de incêndio`
                          );
                          props.setTooltipContentColor(
                            color && isNaN(color) ? color : "#D5D5D5"
                          );
                        }}
                        onMouseLeave={() => {
                          props.setTooltipContent("");
                        }}
                      ></Geography>
                    );
                } else {
                    return <></>;
                }
              })
            }
          </Geographies>
        </ComposableMap>
      </>
    );
  }
};

export default Map;
