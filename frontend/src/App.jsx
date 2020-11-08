import React, { useEffect, useState } from 'react';
import MapaBrasil from './mapa_brasil.png';
import Map  from './Map.js';
import Noticias from './Noticias';

const App = () => {

    return (
        <>
            <section id="firstSection">
                <div className="left">
                    <div className="title">Conheça as <span>reservas ambientais</span> Brasileiras.</div>
                    <div className="subtitle">O Preserva Brasil é uma iniciativa sem fins lucrativos com o objetivo de trazer consciência ambiental.</div>
                </div>
                <div className="right">
                    <img class="mapaBrasil" src={MapaBrasil} alt="" srcset=""/>
                </div>
            </section>

            <section id="noticiasQueimadas">
                <Noticias></Noticias>
            </section>

            <section id="statusQueimadas">
                <div className="sectionTitle">
                    Resumo quantitativo da situação das queimadas no Brasil
                </div>
                <Map></Map>
            </section>
        </>
    )
};

export default App;