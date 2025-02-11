import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as weatherApiService from "../../utilities/weather-api-service";
import "./WeatherDetailPage.css";
import { useState } from "react";

function WeatherDetailPage({ weather, setWeather, user }) {
  
  const { weatherId } = useParams();

  const [icon, setIcon] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [feels_like, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind_speed, setWindSpeed] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [time, setTime] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const savedLocationInfo = {
    user: user,
    location: weather.name,
    icon: icon,
    temp: temperature,
    description: description,
    feels_like: feels_like,
    humidity: humidity,
    wind_speed: wind_speed,
    min: min,
    max: max,
    time: time,
    country: country,
  };
  
  useEffect(function () {
    async function getWeather() {
      const weather = await weatherApiService.getWeatherDetails(weatherId);
      setWeather(weather);
      setIcon(weather.weather[0].icon);
      setTemperature(weather.main.temp.toFixed());
      setDescription(weather.weather[0].description);
      setFeelsLike(weather.main.feels_like.toFixed());
      setHumidity(weather.main.humidity.toFixed());
      setWindSpeed(weather.wind.speed.toFixed());
      setMin(weather.main.temp_min.toFixed());
      setMax(weather.main.temp_max.toFixed());
      setTime(weather.dt);
      setCountry(weather.sys.country);
    }
    getWeather();
  }, []);

  async function handleAddToLocationList() {
    const addWeather = await weatherApiService.addWeatherToLocationList(savedLocationInfo);
    navigate('/locationList')
  }

  return (
    <>
    <center>
      <div className="container-detail">
        {/* icon */}
        {/* <div>{weather.weather? <img alt={weather.name} src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img> : null }</div> */}
        <div className="logo-detail"><img className="logo-detail-img" alt={weather.name} src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img></div>

        {/* location */}
        <di className="location-detail">{weather.name} - {country}</di>

        {/* temp */}
        {/* <div>{weather.main ? <p>Temperature: {weather.main.temp.toFixed()} °F</p> : null }</div> */}
        <div className="temp-detail">{temperature} °F</div>

        {/* description */}
        {/* <div>{weather.weather ? <p>Description: {weather.weather[0].main}</p> : null }</div> */}
        <div className="des-detail-text info">Description </div>
        <div className="des-detail-data info-2">{description}</div>

        {/* feels_like */}
        {/* <div>{weather.main ? <p>Feels Like: {weather.main.feels_like.toFixed()}</p> : null }</div> */}
        <div className="feels-detail-text info">Feels Like </div>
        <div className="feels-detail-data info-2">{feels_like} °F</div>

        {/* humidity */}
        {/* <div>{weather.main ? <p>Humidity: {weather.main.humidity}</p> : null }</div> */}
        <div className="humidity-detail-text info">Humidity</div>
        <div className="humidity-detail-data info-2">{humidity}%</div>

        {/* wind_speed */}
        {/* <div>{weather.wind ? <p>Wind Speed: {weather.wind.speed.toFixed()}</p> : null }</div> */}
        <div className="wind-detail-text info">Wind Speed </div>
        <div className="wind-detail-data info-2">{wind_speed} m/s</div>

        {/* min and max temp */}
        <div className="min-max-detail-data">Min - {min} °F | Max - {max} °F</div>

      <div className="add-btn-detail">
        <button className="detail-btn-2" onClick={handleAddToLocationList}>Add to Locations</button>
      </div>
      </div>
      </center>
    </>
  );
}

export default WeatherDetailPage;