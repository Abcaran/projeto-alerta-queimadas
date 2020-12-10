import React, { useEffect, useState } from "react";
import MapaBrasil from "./mapa_brasil.png";
import Map from "./Map.js";
import Noticias from "./Noticias";
import areas_protegidas from "./areas_protegidas.jpg";
import bombeiro from "./bombeiro.jpg";
import cigarro from "./cigarro.png";
import escudo from "./escudo.svg";
import extintor from "./extintor.svg";
import ReactTooltip from "react-tooltip";
import MouseTooltip from "react-sticky-mouse-tooltip";
import Modal from "./Modal";
import ModalImage from "react-modal-image";

const App = () => {
  const [fires, setFires] = useState([]);
  const [content, setContent] = useState("");
  const [contentColor, setContentColor] = useState("");
  const [stateInfo, setStateInfo] = useState(false);
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("fires.json").then((response) => {
      response.json().then((fires) => {
        setFires(fires);
      });
    });
  }, []);

  const openStatePanel = async (state) => {
    const parsedBM = {};
    setStateInfo(parsedBM);
    setLoading(true);
    let burningMunicipios = await fetch(
      `http://localhost:8080/focos2/33/${state.id}`
    );
    burningMunicipios = await burningMunicipios.json();
    let municipios = await fetch(
      `http://localhost:8080/auxiliar/municipios/33/${state.id}`
    );
    municipios = await municipios.json();

    console.log(burningMunicipios);

    municipios.forEach((mun) => {
      parsedBM[mun.municipio_name] = "Baixo Risco";
    });

    burningMunicipios.forEach((bmun) => {
      parsedBM[bmun.properties.municipio] = "Alto risco";
    });
    console.log(parsedBM);
    setStateInfo(parsedBM);
    setState(state);
    setLoading(false);
  };

  return (
    <>
      <section id="firstSection">
        <div className="left">
          <div className="title">
            Conheça as <span>reservas ambientais</span> Brasileiras.
          </div>
          <div className="subtitle">
            O Preserva Brasil é uma iniciativa sem fins lucrativos com o
            objetivo de trazer consciência ambiental.
          </div>
        </div>
        <div className="right">
          <img class="mapaBrasil" src={MapaBrasil} alt="" srcset="" />
        </div>
      </section>

      <div
        className=""
        id="link_resumo"
        style={{ position: "relative", bottom: 150 }}
      ></div>

      <section
        id="statusQueimadas"
        style={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          paddingBottom: 50,
        }}
      >
        <div className="sectionTitle">
          Resumo quantitativo da situação das queimadas no Brasil
        </div>

        <div className="areasProtegidas">
          <img src={areas_protegidas} alt="" />
        </div>

        <div className="divider">
          <div className="left">
            <div className="sticky">
              <Map
                data-tip=""
                setTooltipContent={setContent}
                setTooltipContentColor={setContentColor}
                stateClickFunction={openStatePanel}
              ></Map>
              <MouseTooltip
                visible={content !== ""}
                offsetX={-60}
                offsetY={-80}
                style={{
                  backgroundColor: "rgba(0, 0, 0, .7)",
                  color: "white",
                  padding: "5px 15px",
                  borderRadius: 15,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: contentColor,
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: 5,
                      border: "1px solid white",
                    }}
                  ></span>
                  {content}
                </span>
              </MouseTooltip>
              <div className="legendas">
                <div>
                  <div
                    style={{
                      backgroundColor: "#BEFF59",
                    }}
                  ></div>
                  <div>&lt;= 10</div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#F6EE89",
                    }}
                  ></div>
                  <div>&lt;= 101</div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#F2DE52",
                    }}
                  ></div>
                  <div>&lt;= 301</div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#FFC766",
                    }}
                  ></div>
                  <div>&lt;= 501</div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#EB7946",
                    }}
                  ></div>
                  <div>&lt;= 701</div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#FF0020",
                    }}
                  ></div>
                  <div>&gt; 701</div>
                </div>
              </div>
              <span
                style={{
                  marginTop: 15,
                  fontSize: 14,
                }}
              >
                Na legenda, as cores são divididas pelo número de focos de
                incêndio.
              </span>
            </div>
          </div>
          <div className="right">
            <div className="fireMapsTitle">
              Mapa dinâmico das queimadas no Brasil
            </div>
            <div className="description">
              O mapa dinâmico das queimadas realiza consultas a cada hora na API
              de queimadas do INPE, se mantendo sempre atualizado. Ele lista o
              número de focos de incêndio em cada estado, demonstrando através
              de uma legenda de cores os estados em situação emergencial.
            </div>
            <div className="item">
              1. Passe o mouse por cima dos estados para ver o número de focos
              de incêndio de cada estado.
            </div>
            <div className="item">
              2. Clique em um estado para visualizar o status de cada um dos
              municípios daquele estado.
            </div>
            <div className="item">
              3. Utilize a filtragem por regiões para facilitar sua busca.
            </div>
          </div>
        </div>
      </section>

      <div
        className=""
        id="link_noticias"
        style={{ position: "relative", bottom: 100 }}
      ></div>

      <section id="noticiasQueimadas">
        <Noticias></Noticias>
      </section>

      <div
        className=""
        id="link_orientacoes"
        style={{ position: "relative", bottom: 100 }}
      ></div>

      <section
        id="orientacoes"
        style={{
          padding: "50px 200px",
        }}
      >
        <div className="sectionTitle">Orientações</div>

        <div className="row">
          <div className="textWrapper">
            <span className="innerTitle"><img src={escudo}/> Dicas para evitar queimadas:</span>
            <ul>
              <li>
                Ao fazer uma fogueira ou colocar velas limpe a área ao redor.
              </li>
              <li>
                Lembre-se de apagar o fogo antes de deixar o local com água ou
                terra.
              </li>
              <li>Manter fósforos e isqueiros fora do alcance das crianças.</li>
              <li>
                Optar sempre que possível por estratégias alternativas ao uso do
                fogo.
              </li>
              <li>
                Não jogue guimbas de cigarro em qualquer lugar, principalmente
                mal apagadas.
              </li>
              <li>
                Não queime materiais de descarte. Procure um local adequado de
                coleta.
              </li>
              <li>Não soltar balões.</li>
            </ul>
          </div>
          <div className="imgWrapper">
            <ModalImage
              small={cigarro}
              large={cigarro}
              alt="Um pequeno cigarro pode ser a causa de uma grande queimada"
            />
          </div>
        </div>

        <div className="row">
          <div
            className="imgWrapper"
            style={{ marginLeft: 0, marginRight: "7%" }}
          >
            <ModalImage
              small={bombeiro}
              large={bombeiro}
              alt="Bombeiro apagando um incêndio florestal (https://unsplash.com/photos/g_yGEbdp4GA)"
            />
          </div>
          <div className="textWrapper">
            <span className="innerTitle"><img src={extintor}/> Dicas para combater queimadas:</span>
            <ul>
              <li>
                Ter todos os telefones úteis à mão, como do Corpo de Bombeiros
                (número 193), prefeitura e/ou Defesa Civil
              </li>
              <li>
                Se o fogo for em áreas de pastagem, abrir a cerca para os
                animais saírem para lugares a salvo do fogo
              </li>
              <li>
                Retirar qualquer material que possa ser combustível para o
                incêndio
              </li>
              <li>
                Utilizar terra ou qualquer meio para abafar a chama (cortar o
                fluxo de oxigênio que alimenta a chama).
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div
        className=""
        id="link_contato"
        style={{ position: "relative", bottom: 100 }}
      ></div>

      <section
        id="contato"
        style={{
          backgroundColor: "rgba(0, 0, 0, .03)",
          padding: "50px 200px",
        }}
      >
        <div className="sectionTitle">Contatos</div>
        <div>
          Órgão estadual do meio ambiente – procure a regional mais próxima
          <br />
          Corpo de Bombeiros – ligue 193
          <br />
          Polícia Civil – ligue 147
          <br />
          <br />
        </div>
        <table>
          <thead>
            <tr>
              <th colspan="2">Para avisar sobre as queimadas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Nacional</strong>
              </td>
              <td>
                <strong>Ibama</strong>
                <br />
                0800-61-8080
                <br />
                linhaverde@ibama.gov.br
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <strong>
                  Secretarias Estaduais do Meio Ambiente
                  <br />
                </strong>
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  AC
                  <br />
                </strong>
              </td>
              <td>(68) 3223-3090</td>
            </tr>
            <tr>
              <td>
                <strong>
                  AL
                  <br />
                </strong>
              </td>
              <td>(82) 3315-2680</td>
            </tr>
            <tr>
              <td>
                <strong>
                  AM
                  <br />
                </strong>
              </td>
              <td>(92) 3642-4724</td>
            </tr>
            <tr>
              <td>
                <strong>AP</strong>
              </td>
              <td>(96) 3212-5310</td>
            </tr>
            <tr>
              <td>
                <strong>
                  BA
                  <br />
                </strong>
              </td>
              <td>(71) 3115 6288</td>
            </tr>
            <tr>
              <td>
                <strong>
                  CE
                  <br />
                </strong>
              </td>
              <td>(85) 3101-5520</td>
            </tr>
            <tr>
              <td>
                <strong>
                  DF
                  <br />
                </strong>
              </td>
              <td>(61) 3355-8060</td>
            </tr>
            <tr>
              <td>
                <strong>
                  ES
                  <br />
                </strong>
              </td>
              <td>(27) 3136-3441</td>
            </tr>
            <tr>
              <td>
                <strong>
                  GO
                  <br />
                </strong>
              </td>
              <td>(62) 3201-5150</td>
            </tr>
            <tr>
              <td>
                <strong>
                  MA
                  <br />
                </strong>
              </td>
              <td>(98) 3218-8956</td>
            </tr>
            <tr>
              <td>
                <strong>
                  MG
                  <br />
                </strong>
              </td>
              <td>(31) 3915-1299</td>
            </tr>
            <tr>
              <td>
                <strong>
                  MS
                  <br />
                </strong>
              </td>
              <td>(67) 3318-4100</td>
            </tr>
            <tr>
              <td>
                <strong>
                  MT
                  <br />
                </strong>
              </td>
              <td>(65) 3613-7200</td>
            </tr>
            <tr>
              <td>
                <strong>
                  PA
                  <br />
                </strong>
              </td>
              <td>(91) 3184-3349</td>
            </tr>
            <tr>
              <td>
                <strong>
                  PB
                  <br />
                </strong>
              </td>
              <td>(83) 3218-5661</td>
            </tr>
            <tr>
              <td>
                <strong>
                  PE
                  <br />
                </strong>
              </td>
              <td>(81) 3181-1700</td>
            </tr>
            <tr>
              <td>
                <strong>
                  PI
                  <br />
                </strong>
              </td>
              <td>(86) 3216-2038</td>
            </tr>
            <tr>
              <td>
                <strong>
                  PR
                  <br />
                </strong>
              </td>
              <td>(41) 3304-7700</td>
            </tr>
            <tr>
              <td>
                <strong>
                  RJ
                  <br />
                </strong>
              </td>
              <td>(21) 2334-5906</td>
            </tr>
            <tr>
              <td>
                <strong>
                  RN
                  <br />
                </strong>
              </td>
              <td>(84) 3232-2400</td>
            </tr>
            <tr>
              <td>
                <strong>
                  RO
                  <br />
                </strong>
              </td>
              <td>(69) 3216-1065</td>
            </tr>
            <tr>
              <td>
                <strong>
                  RR
                  <br />
                </strong>
              </td>
              <td>(95) 2121-9176</td>
            </tr>
            <tr>
              <td>
                <strong>
                  RS
                  <br />
                </strong>
              </td>
              <td>(51) 3288-8100</td>
            </tr>
            <tr>
              <td>
                <strong>
                  SC
                  <br />
                </strong>
              </td>
              <td>(48) 3029-9014</td>
            </tr>
            <tr>
              <td>
                <strong>
                  SE
                  <br />
                </strong>
              </td>
              <td>(79) 3179-7310</td>
            </tr>
            <tr>
              <td>
                <strong>
                  SP
                  <br />
                </strong>
              </td>
              <td>(11) 3133-3000</td>
            </tr>
            <tr>
              <td>
                <strong>
                  TO
                  <br />
                </strong>
              </td>
              <td>(63) 3218-2600</td>
            </tr>
          </tbody>
        </table>
        <a
          href="http://g1.globo.com/brasil/noticia/2010/08/saiba-como-denunciar-queimadas.html"
          style={{ display: "block", marginTop: 10 }}
        >
          Fonte da tabela
        </a>
      </section>

      <Modal
        stateInfo={stateInfo !== false}
        state={state}
        closeModal={() => {
          setStateInfo(false);
          setState(null);
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, .9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {stateInfo !== false && (
          <table>
            <thead>
              <tr>
                <th>Nome do município</th>
                <th>Grau de Risco</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(stateInfo).map((x) => {
                return (
                  <tr>
                    <td>{x}</td>
                    <td>{stateInfo[x] === "Alto risco" ? <span style={{
                        display: 'inline-block',
                        backgroundColor: '#FF0020',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: '1px solid black',
                        position: 'relative',
                        top: 5,
                        marginRight: 10
                    }}/> : <span style={{
                        display: 'inline-block',
                        backgroundColor: '#BEFF59',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: '1px solid black',
                        position: 'relative',
                        top: 5,
                        marginRight: 10
                    }}/>} {stateInfo[x]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Modal>
    </>
  );
};

export default App;
