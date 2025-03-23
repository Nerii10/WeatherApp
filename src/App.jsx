import { useEffect, useState } from 'react'
import React from 'react'

import Searchbar from './Components/Searchbar/SearchBar'
import Forecast from './Components/Forecast/Forecast'
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import SolarCycleGraph from './Components/CurrentWeather/SolarCycleGraph'
import WeatherInput from './Components/WeatherUtils/WeatherInput'

import TEST from './Components/Test'


function App() {  

  const [ForecastHourlyData, setForecastHourlyData] = useState(0)
  const [WeatherData, setWeatherData] = useState(0)
  const [CurrentHour, setCurrentHour] = useState(0)
  const [Error, setError] = useState(0)

  const CurrentDate = new Date();
  
  useEffect(() => {
    if (WeatherData?.timezone !== undefined && WeatherData?.timezone !== null) {
      const OffsetInSeconds = WeatherData.timezone; 
      const UTCDate = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000); 
      const LocalTime = new Date(UTCDate.getTime() + OffsetInSeconds * 1000);
      const Hour = LocalTime.getHours();
      const Minutes = LocalTime.getMinutes();
      const TimeLocal = `${Hour.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}`;
      
      const TimeUS = (parseInt(TimeLocal.slice(0, 2)) % 12 || 12) + TimeLocal.slice(2, 5) + (parseInt(TimeLocal.slice(0, 2)) >= 12 ? "PM" : "AM");

      setWeatherData(prev => ({
        ...prev, 
        TimeLocal,
        TimeUS
      }));
    }
  }, [WeatherData.coord]);
  
  useEffect(()=>{
    console.log(WeatherData)
  },[WeatherData])

  return (
    <>
      <div className='MainContainer'>
        <div style={{height:"100px"}}></div>

        <Searchbar setForecastHourlyData={setForecastHourlyData} setWeatherData={setWeatherData} setError={setError}/> 

        <div style={{display:'flex', justifyContent:"space-between"}}>
        <h1>{WeatherData.name}</h1>
        <h1>{WeatherData.TimeUS}</h1> 
        </div>
        
        
     
        <h1>Forecast</h1>
        <Forecast ForecastHourlyData={ForecastHourlyData} />


        <h1>Weather</h1>
        <CurrentWeather WeatherData={WeatherData} />

   
        {/*  <TEST Data={WeatherData} />  */}
      </div>
    </>
  )
}

export default App;
