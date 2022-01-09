import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherDetails from "./WeatherDetails";

function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("Uzbekistan");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=0d169513accb3a103ef9019b6704116a`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myWeatherInfo)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Type city name..."
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        <button type="submit" className="searchButton" onClick={getWeatherInfo}>
          Search
        </button>
        </div>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
}

export default SearchMain;
