import { motion } from "motion/react"
import { useEffect } from "react";

import './Forecast.css'
import IconMapper from "../WeatherUtils/IconMapper";
import { a } from "motion/react-client";

export default function Forecast({ForecastHourlyData}) {

    const Forecast = ForecastHourlyData.list
    
    const date = new Date();
    const timestampNow = date.getTime(); 
    const timestamp24hLater = timestampNow + 48 * 60 * 60 * 1000; 

    const FilteredForecast = Forecast?.filter((element) => {
        const forecastTimestamp = new Date(element.dt_txt).getTime();
        return forecastTimestamp >= timestampNow && forecastTimestamp <= timestamp24hLater;
    });

    const DailyForecast = Forecast && Object.values(Forecast?.reduce((acc, element, index) => {
        if (index === 0) return acc;
    
        const date = new Date(element.dt_txt);
        const day = date.toISOString().split('T')[0];  
    
        if (!acc[day]) {
            acc[day] = {
                date: day,
                weather: element.weather[0]?.main,
                minTemp: element.main.temp_min,
                maxTemp: element.main.temp_max,
            }
        } else {
            if (element.main.temp_min < acc[day].minTemp) {
                acc[day].minTemp = element.main.temp_min;
            }
            if (element.main.temp_max > acc[day].maxTemp) {
                acc[day].maxTemp = element.main.temp_max;
            }
        }
    
        return acc;
    }, {}));
    
    const Weekdata = {
        minTemp: Infinity,
        maxTemp: -Infinity
    }

    DailyForecast?.map((element,index)=>{
        if(Weekdata.minTemp > element.minTemp) {
            Weekdata.minTemp = Math.round(element.minTemp)
        }

        if(Weekdata.maxTemp < element.maxTemp) {
            Weekdata.maxTemp = Math.round(element.maxTemp)
        }
    })

    return(
        <>
        
            <motion.div
            className="Hourly-Forecast-Container"
            >

                <motion.div
                className="Hourly-Forecast"
                >
                    {FilteredForecast?.map((element,index)=>{
                        return(
                            <>
                                <motion.div
                                className="Hourly-Forecast-Input"
                                >
                                    <p>{(new Date(element.dt_txt).getHours() % 12 || 12)}<span style={{fontSize:"14px"}}>{new Date(element.dt_txt).getHours() >= 12 ? "PM" : "AM"}</span></p>
                                    <IconMapper Weather={element.weather[0].main} />
                                    <p>{Math.round(element.main.temp)}°</p>
                                </motion.div>
                            </>
                        )
                    })}
                </motion.div>
            
            </motion.div>   

            <br></br>
            <br></br>
            
            <motion.div
                className="Daily-Forecast-Container"
                >
                    {DailyForecast?.map((element,index)=>{
                        const weeklyRange = Math.round(Weekdata.maxTemp) - Math.round(Weekdata.minTemp);
                        const marginLeftPercent = ((Math.round(element.minTemp) - Math.round(Weekdata.minTemp)) / weeklyRange) * 100;
                        const widthPercent = ((Math.round(element.maxTemp) - Math.round(element.minTemp)) / weeklyRange) * 100;
                        
                        return(
                            <>

                                <div className="Daily-Forecast-Input">
                                    <p className="Daily-Forecast-Input-Day">{new Date(element.date).toLocaleDateString("en-US", {weekday:"long"})}</p>

                                    <div className="Daily-Forecast-Input-Icon">
                                        <p> <IconMapper Weather={element.weather}/></p>
                                    </div>




                                    <div className="Daily-Forecast-Input-Temp">
                                        <p className="Daily-Forecast-Input-Min">{Math.round(element.minTemp)}</p>

                                        <div className="Daily-Forecast-Input-Range">
                                            <div 
                                            className="Daily-Forecast-Input-Range-Acitve"
                                            style={{ 
                                                width: `${widthPercent}%`,
                                                marginLeft: `${marginLeftPercent}%`,
                                            }}
                                            >
                                            </div>
                                    </div>



                                        <p className="Daily-Forecast-Input-Max">{Math.round(element.maxTemp)}</p>
                                    </div>
                                </div>
                               
                            </>
                        )
                    })}
                </motion.div>

                {Weekdata?.maxTemp} weekmax
                {Weekdata?.minTemp} weekmin
        </>
    )   
}