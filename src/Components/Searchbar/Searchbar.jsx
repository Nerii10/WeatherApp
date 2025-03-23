import { useEffect,useState } from "react"
import { motion } from "motion/react"

import './Searchbar.css'
import Cities from '../../Data/Cities.json'

import { Search, MapPin} from "lucide-react"

export default function Searchbar({setForecastHourlyData, setForecastDailyData, setWeatherData, setError}) {

    const [City, setCity] = useState('')
    const [FilteredCities, setFilteredCities] = useState(Cities)
    const [CurrentWeather,setCurrentWeather] = useState("error")

    useEffect(() => {
        if (City === '') {
            setFilteredCities([]);
        } else {
            setFilteredCities(Cities.filter((city) => city.name.toLowerCase().includes(City.toLowerCase())));
        }

    }, [City]);
    

    async function DownloadCityData(city) {
        if(CurrentWeather.toLowerCase() != city.toLowerCase()) {
            if(city){
                const SearchCity = city
                setCity('')
                try{
                    const forecastHourly = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${SearchCity}&appid=d761cbc2e510fae55ee5be6baec4151f&units=metric&lang=eng`)
                    const forecastHourlydata = await forecastHourly.json()
    
                    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${SearchCity}&appid=d761cbc2e510fae55ee5be6baec4151f&units=metric&lang=eng`)
                    const weatherdata = await weather.json()
                    
                    setCurrentWeather("error")
    
                    if(forecastHourly.ok){
                        setForecastHourlyData(forecastHourlydata)
                        setError(0)
                    } 
    
                    if(weather.ok){
                        setWeatherData(weatherdata)
                        setCurrentWeather(weatherdata.name)
                        setError(0)
                    } else {setError(1); setForecastHourlyData(0); setWeatherData(0)}
    
                    } catch(err) {console.log(err); setError(1);}
            }
        }
    }

    return(   
    <>
        <div style={{zIndex:1, position:'relative'}}>
            <form className="Search-Inputs-Container" onSubmit={(e) => { e.preventDefault(); DownloadCityData(FilteredCities.length != 0 ? FilteredCities[0].name : City); }}>
                <div className="Search-Input-Text-Container">
                    <Search className="Search-Input-Text-Icon" style={{height:'100%'}}/>
                    <input type="text" className="Search-Input-Text" onChange={(event) => { setCity(event.target.value); }} value={City} />
                    <h2 className={City.length == 0 ? "Search-Input-Text-Hint" : "Search-Input-Text-Hint-Hidden" }>Search cities</h2>
                    <div 
                    className={City.length != 0 ? "Search-List-Open" : "Search-List"}>
                        {FilteredCities.map((element,index)=>{
                            return(
                                <motion.div className={"Search-List-Item"} onClick={()=>{setCity(element.name); DownloadCityData(element.name)}}
                                whileTap={{scale:0.9}}
                                whileHover={{scale:1.05, rotateZ:"3deg"}}
                                >
                                    <MapPin style={{flexShrink:0, pointerEvents:'none'}}/>
                                    <p style={{pointerEvents:'none'}}>{element.name}</p>
                                </motion.div>
                            )
                        })}                
                        {FilteredCities.length == 0 && "-"}        
                    </div>
                </div>
                
                <motion.input type="submit" className="Search-Input-Button" value={"Search"} 
                whileTap={{scale:0.9}}
                whileHover={{scale:1.1}}
                />
                
            </form>
        </div>

    </>
    )
}