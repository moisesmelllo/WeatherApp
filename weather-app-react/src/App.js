import React, { useState } from "react";
import "./index.css";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <section className="pesquisa">
        <input type="text" placeholder="Digite seu local" />
        <button>Pesquisar</button>
      </section>
      <section className="body">
        <div className="content">New York</div>
        <div className="content">20ºC</div>
      </section>
      <section className="footer">
        <div className="content">Cloudy</div>
        <div className="content">20/12</div>
      </section>
    </div>
  );
}

export default App;
