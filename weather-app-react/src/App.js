import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { key } from "./keys";
import {format} from 'date-fns'

function App() {
  const [apiData, setApiData] = useState({});
  const [searchLocation, setSearchLocation] = useState("");

  const fetchData = () => {
    const api_key = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&APPID=${key}&units=metric`

    axios.get(api_key)
      .then(response => {
        setApiData(response.data)
      })
      .catch(error => {
        console.error('Erro na requisição: ', error);
      });
  };

  const handleSearch = () => {
    fetchData();
  };


  return (
    <div className="App">
      <section className="pesquisa">
        <input 
        type="text" 
        placeholder="Digite seu local" 
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Pesquisar</button>
      </section>
      {Object.keys(apiData).length > 0 && (
        <>
      <section className="body">
        <div className="content">{apiData.name}</div>
        <div className="content">{apiData.main.temp}ºC</div>
      </section>
      <section className="footer">
        <div className="content">{apiData.weather[0].main}</div>
        <div className="content">{format(new Date(), 'dd/MM')}</div>
      </section>
      </>
        )}
    </div>
  );
}

export default App;
