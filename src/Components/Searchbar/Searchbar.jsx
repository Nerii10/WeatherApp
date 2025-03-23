import { useEffect,useState } from "react"

import './Searchbar.css'

import { Search } from "lucide-react"

export default function Searchbar({setForecastHourlyData, setForecastDailyData, setWeatherData, setError}) {

    const [City, setCity] = useState('')

    async function DownloadCityData() {
        try{
            const forecastHourly = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=d761cbc2e510fae55ee5be6baec4151f&units=metric&lang=eng`)
            const forecastHourlydata = await forecastHourly.json()

            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=d761cbc2e510fae55ee5be6baec4151f&units=metric&lang=eng`)
            const weatherdata = await weather.json()
            
            if(forecastHourly.ok){
                setForecastHourlyData(forecastHourlydata)
            } 

            if(weather.ok){
                setWeatherData(weatherdata)
            } else {setError(1); setForecastHourlyData(0); setWeatherData(0)}

            } catch(err) {console.log(err); setError(1);}
    }

    return(   
    <>
        <div>
            <form className="Search-Inputs-Container">
                <div className="Search-Input-Text-Container">
                    <Search className="Search-Input-Text-Icon"/>
                    <input type="text" className="Search-Input-Text" onChange={(event)=>{setCity(event.target.value)}} value={City}></input>
                </div>
                <input type="button" className="Search-Input-Button" value={"Search"} onClick={()=>{DownloadCityData()}}></input>
            </form>
        </div>
    </>
    )
}