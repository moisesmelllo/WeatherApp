import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { key, img_key } from "./keys";
import {format} from 'date-fns'


function App() {
  const [apiData, setApiData] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [apiError, setApiError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const fetchData = () => {
    const api_key = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&APPID=${key}&units=metric`
    const api_img = `https://api.unsplash.com/search/photos?query=${searchLocation}&client_id=${img_key}`

    

    axios.get(api_key)
      .then(response => {
        setApiData(response.data)
        console.log(response);
        setApiError(null)
        setSearchLocation("")
        fetchImage(api_img)
      })
      .catch(error => {
        console.error('Erro na requisição: ', error);
        setApiData({})
        setApiError("Localização não encontrada. Verifique o nome e tente novamente.");
        setSearchLocation("")
      });
  };

  const fetchImage = (url) => {
    axios.get(url)
      .then(response => {
        const image = response.data.results[0].urls.regular; // Obtém a URL da imagem do resultado
        setImageUrl(image);
      })
      .catch(error => {
        console.error('Erro na requisição da imagem: ', error);
      });
  };

  const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          fetchData();
        }}

return (
    <div className={`App ${ Object.keys(apiData).length ? 'background' : 'default-background'}`}
       style={{ backgroundImage:  Object.keys(apiData).length && `url(${imageUrl})` }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
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
      
      {apiData.name && (
        <section className="box">
        <>
          <section className="body">
            <div className="container">
              <div className="content">{apiData.name}</div>
              <div className="temperatura">
                {apiData.main && (
                  <div className="content degree">{apiData.main.temp.toFixed(0)}</div>
                )}
                <p className="metric">ºC</p>
              </div>
            </div>
          </section>
          <section className="media">
            {apiData.sys && (
              <img src={`https://flagsapi.com/${apiData.sys.country}/shiny/64.png`} alt="Flag" />
            )}
          </section>
          <section className="extra-info-container">
            <div className="vento">
              <p><span className="material-symbols-outlined">
                air
                </span></p>
              <p>{apiData.wind.speed}</p>
            </div>
            <div className="umidade">
              <p><span className="material-symbols-outlined umidade-simbol">
                humidity_low
                </span></p>
              <p>{apiData.main.humidity}</p>
            </div>
          </section>
          <section className="footer">
            {apiData.weather && apiData.weather[0] && (
              <>
                <div className="content">{apiData.weather[0].main}</div>
                <div className="content-date">{format(new Date(), 'dd/MM')}</div>
              </>
            )}
          </section>
        </>
        </section>
      )}
        {apiError && <div className="error-content">{apiError}</div>}
      
    </div>
  );
}

export default App;