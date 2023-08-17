import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { key } from "./keys";
import {format} from 'date-fns'

function App() {
  const [apiData, setApiData] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [apiError, setApiError] = useState(null);

  const fetchData = () => {
    const api_key = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&APPID=${key}&units=metric`
    console.log(api_key);

    axios.get(api_key)
      .then(response => {
        setApiData(response.data)
      })
      .catch(error => {
        console.error('Erro na requisição: ', error);
        setApiError("Erro na requisição.");
      });

      
  };

  const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          fetchData();
        }}

return (
    <div className="App">
      <section className="pesquisa">
        <input 
          className="input"
          type="text" 
          placeholder="Digite seu local" 
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          onKeyUp={handleKeyPress}
        />
        <button onClick={() => fetchData()}>Pesquisar</button>
      </section>
      {apiError && <div className="error">{apiError}</div>}
      {apiData.name && (
        <>
          <section className="body">
            <div className="content">{apiData.name}</div>
            {apiData.main && (
              <div className="content">{apiData.main.temp.toFixed(0)}ºC</div>
            )}
          </section>
          <section className="media">
            {apiData.sys && (
              <img src={`https://flagsapi.com/${apiData.sys.country}/shiny/64.png`} alt="Flag" />
            )}
          </section>
          <section className="footer">
            {apiData.weather && apiData.weather[0] && (
              <>
                <div className="content">{apiData.weather[0].main}</div>
                <div className="content">{format(new Date(), 'dd/MM')}</div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default App;