function WeatherData({ weatherData, error, inputValue }) {
  if (!inputValue && !weatherData) {
    return null; // Jeśli brak danych i brak inputValue, nie renderuj nic
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      {error ? (
        <p>Try Again</p>
      ) : weatherData ? (
        <div className="DataContainer">
            <h1>{weatherData.name}</h1>
            <h2>{weatherData.main.temp} °C</h2>
        
          {/* Każda dana w osobnym divie z klasą Data */}
          <div className="Data">
            <h3>Feels Like</h3>
            <h2>{weatherData.main.feels_like} °C</h2>
            <br></br>
            {weatherData.main.feels_like > weatherData.main.temp ? <h2>It feels warmer than it is</h2> : <h2>It feels colder than it is</h2>}
          </div>

          <div className="Data">
            <h3>Weather</h3>
            <h2>{weatherData.weather[0].description}</h2>
            <h1></h1>
          </div>

          <div className="Data">
            <h3>Humidity</h3>
            <h2>{weatherData.main.humidity}%</h2>
            <h1></h1>
          </div>

          <div className="Data">
            <h3>Pressure</h3>
            <h2>{weatherData.main.pressure} hPa</h2>
          </div>

          <div className="Data">
            <h3>Wind Speed</h3>
            <h2>{weatherData.wind.speed} m/s</h2>
          </div>

          <div className="Data" >
            <h3>Wind Direction</h3>
            <h2>{weatherData.wind.deg}°</h2>
          </div>
          
          <div className="Data" >
            <h3>Visibility</h3>
            <h2>{(weatherData.visibility / 1000).toFixed(0)} mi</h2>
          </div>
        </div>
      ) : (
        <p>Input Valid City</p>
      )}
    </div>
  );
}

export default WeatherData;
