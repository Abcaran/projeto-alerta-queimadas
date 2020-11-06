import React from 'react';
import MapaBrasil from './mapa_brasil.png';
import Map  from './Map.js';

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

            <section id="statusQueimadas">
                <Map></Map>
            </section>
        </>
    )
};

export default App;