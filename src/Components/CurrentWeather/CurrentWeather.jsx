import WeatherInput from "../WeatherUtils/WeatherInput";
import SolarCycleGraph from "./SolarCycleGraph";

import './CurrentWeather.css'

import { ThermometerSun, Wind, Droplet, Sun, Sunset, Sunrise, Minus} from "lucide-react";



export default function CurrentWeather({WeatherData}){

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); 
        let hours = date.getHours();
        const minutes = date.getMinutes();
        
        const ampm = hours >= 12 ? "PM" : "AM";
        
        hours = hours % 12;
        hours = hours ? hours : 12; 
        
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    };
    

    return(
        <>
            {WeatherData && 
                <>
                <hr></hr>
            
                    <div className="weather-grid">
                        <div className="weather-grid-input-group">
                                <div className="weather-grid-input">

                                    <div className="weather-grid-input-main">
                                        <ThermometerSun style={{flexShrink:0}}></ThermometerSun>
                                        <h2>Weather</h2>
                                    </div>

                                    <div className="weather-grid-input-desc">
                                        <p><Minus style={{flexShrink:0}}/>{WeatherData?.main.temp}°</p>
                                        <p><Minus style={{flexShrink:0}}/>{WeatherData?.weather[0]?.main}</p>
                                        <p><Minus style={{flexShrink:0}}/>{WeatherData?.weather[0]?.description}</p>
                                    </div>
                                
                                </div>

                                <div className="weather-grid-input">
                                    
                                <div className="weather-grid-input-main">
                                    <Droplet style={{flexShrink:0}}></Droplet>
                                    <h2>Atmosphere</h2>
                                </div>

                                <div className="weather-grid-input-desc">
                                    <p><Minus style={{flexShrink:0}}/>{WeatherData?.main.humidity} %</p>
                                    <p><Minus style={{flexShrink:0}}/>{WeatherData?.main.pressure} hPa</p>
                                </div>
                                
                                </div>
                            </div>
                            
                            <div className="weather-grid-input-group">
                                <div className="weather-grid-input">

                            <div className="weather-grid-input-main">
                                <Wind style={{flexShrink:0}}></Wind>
                                <h2>Wind</h2>
                            </div>

                            <div className="weather-grid-input-desc">
                                <p><Minus style={{flexShrink:0}}/>{WeatherData?.wind.speed} m/s</p>
                            </div>

                                </div>

                                <div className="weather-grid-input">

                                <div className="weather-grid-input-main">
                                    <Sun style={{flexShrink:0}}></Sun>

                                    <h2>Feels Like</h2>
                                </div>

                                <div className="weather-grid-input-desc">
                                    <p><Minus style={{flexShrink:0}}/>{WeatherData?.main.feels_like}°</p>
                                </div>

                                </div>
                            </div>

                        
                            
                            <div className="weather-grid-input" style={{width:"100%"}}>

                                <div className="weather-grid-input-main">
                                    <Sunrise style={{flexShrink:0}}></Sunrise>
                                    <h2>Sunrise</h2>
                                </div>

                                <div className="weather-grid-input-desc" style={{width:"100%",height:"200px", display:'flex', flexDirection:'row',alignItems:'center', justifyContent:"space-between", boxSizing:'border-box', padding: "0px 4vw"}}>
                                    <div className="weather-grid-input-desc" style={{width:"200px",height:"200px", flexShrink:0}}>
                                        <SolarCycleGraph WeatherData={WeatherData} />
                                    </div>
                                    <div style={{width:"fit-content", display:'flex', flexDirection:'column',gap:"50px"}}>
                                        <p><Sunrise/> {formatTime(WeatherData?.sys?.sunrise)}</p>
                                        <p><Sunset/>  {formatTime(WeatherData?.sys?.sunset)}</p>
                                    </div>
                                </div>


                            </div>
                    </div>
                       


                <hr></hr>

                <h1>OLD</h1>
                <p>Sunrise: {formatTime(WeatherData?.sys.sunrise)}</p>
                <p>Sunset: {formatTime(WeatherData?.sys.sunset)}</p>

                </>
            }
        </>
    )
}