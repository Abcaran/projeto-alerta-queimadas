import React, { useEffect, useState } from 'react';
import MapaBrasil from './mapa_brasil.png';
import Map  from './Map.js';
import Noticias from './Noticias';
import areas_protegidas from './areas_protegidas.jpg';

const App = () => {

    const [fires, setFires] = useState([]);

    useEffect(() => {
        fetch('fires.json').then(response => {
            response.json().then(fires => {
                setFires(fires);
            })
        })  
    }, []);

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
        
        <div className="" id="link_resumo"  style={{position:'relative', bottom: 150}}></div>

        <section id="statusQueimadas" style={{
            backgroundColor: 'rgba(0, 0, 0, .03)',
            paddingBottom: 50
        }}>
          <div className="sectionTitle">
            Resumo quantitativo da situação das queimadas no Brasil
          </div>

          <div className="areasProtegidas">
            <img src={areas_protegidas} alt="" />
          </div>

          <div className="divider">
            <div className="left">
              <div className="sticky">
                <Map></Map>
                <table>
                  <thead>
                    <tr>
                      <th>Número de focos</th>
                      <th>Legenda</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>&lt;= 10</td>
                      <td
                        style={{
                          backgroundColor: "#BEFF59",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <td>&lt;= 101</td>
                      <td
                        style={{
                          backgroundColor: "#F6EE89",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <td>&lt;= 301</td>
                      <td
                        style={{
                          backgroundColor: "#F2DE52",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <td>&lt;= 501</td>
                      <td
                        style={{
                          backgroundColor: "#FFC766",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <td>&lt;= 701</td>
                      <td
                        style={{
                          backgroundColor: "#EB7946",
                        }}
                      ></td>
                    </tr>
                    <tr>
                      <td>&gt; 701</td>
                      <td
                        style={{
                          backgroundColor: "#FF0020",
                        }}
                      ></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="right">
              <table>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: 10,
                        border: 0,
                      }}
                    >
                      #
                    </th>
                    <th>Nome do estado</th>
                    <th>Focos de incêndio</th>
                  </tr>
                </thead>
                <tbody>
                  {fires.map((fire) => {
                    return (
                      <tr className={`CLASS${fire.color}`}>
                        <td
                          style={{
                            backgroundColor: fire.color,
                            width: 10,
                            padding: 0,
                            margin: 0,
                            borderRight: "1px solid rgba(0, 0, 0, .3)",
                          }}
                        ></td>
                        <td>{fire.name}</td>
                        <td>{fire.fires ? fire.fires : 0}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="" id="link_noticias" style={{position:'relative', bottom: 100}}></div>


        <section id="noticiasQueimadas">
          <Noticias></Noticias>
        </section>

        <div className="" id="link_contato" style={{position:'relative', bottom: 100}}></div>


        <section id="contato" style={{
            backgroundColor: 'rgba(0, 0, 0, .03)',
            padding: "50px 200px"
        }}>
          <div className="sectionTitle">Contatos</div>
            <div>
                Ibama – denúncias pela Linha Verde (0800 618080), na sede em Brasília ou na superintendência do Estado<br/>
                Órgão estadual do meio ambiente – procure a regional mais próxima<br/>
                Corpo de Bombeiros – ligue 193<br/>
                Polícia Civil – ligue 147
                <br/><br/>
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
          <a href="http://g1.globo.com/brasil/noticia/2010/08/saiba-como-denunciar-queimadas.html" style={{display: 'block', marginTop: 10}}>Fonte da tabela</a>
        </section>
      </>
    );
};

export default App;