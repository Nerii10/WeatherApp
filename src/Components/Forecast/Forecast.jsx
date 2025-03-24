import { motion } from "motion/react"
import { useEffect } from "react";

import './Forecast.css'
import IconMapper from "../WeatherUtils/IconMapper";
import { a } from "motion/react-client";

export default function Forecast({ForecastHourlyData}) {

    const Forecast = ForecastHourlyData.list
    
    const date = new Date();
    const timestampNow = date.getTime(); 
    const timestamp24hLater = timestampNow + 60 * 60 * 60 * 1000; 

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
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                transition={{type:"spring", damping:23, delay: (0.1 * index) +0.5}}
                                >
                                    <p className="Hourly-Forecast-Input-Hours">{(new Date(element.dt_txt).getHours() % 12 || 12)}<span style={{fontSize:"14px"}}>{new Date(element.dt_txt).getHours() >= 12 ? "PM" : "AM"}</span></p>
                                    <p className="Hourly-Forecast-Input-Icon"><IconMapper Weather={element.weather[0].main} /></p>
                                    <p className="Hourly-Forecast-Input-Temp">{Math.round(element.main.temp)}°</p>
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
                        const widthPercent = ((((Math.round(element.maxTemp) - Math.round(element.minTemp)) == 0 ? 1 : (Math.round(element.maxTemp) - Math.round(element.minTemp))) / weeklyRange) * 100)
                        
                        return(
                            <>
        
                                <motion.div className="Daily-Forecast-Input"
                                style={index == DailyForecast.length-1 && {border:"none"}}
                                 initial={{opacity:0}}
                                 animate={{opacity:1}}
                                 transition={{type:"spring", damping:23, delay: (0.1 * index) +0.6}}
                                >
                                    <div style={{display:'flex',justifyContent:'start', alignItems:'center', width:"30%"}}>
                                        <p style={{ margin: 0 }} className="Daily-Forecast-Input-Day">
                                        {(() => {
                                            const today = new Date();
                                            const elementDate = new Date(element.date);
                                            
                                            if (elementDate.toDateString() === today.toDateString()) {
                                            return "Today";
                                            }

                                            return elementDate.toLocaleDateString("en-US", { weekday: "long" }).slice(0, 3);
                                        })()}
                                        </p>


                                        <div className="Daily-Forecast-Input-Icon">
                                            <p style={{margin:0}}> <IconMapper Weather={element.weather}/></p>
                                        </div>
                                    </div>
                                    




                                    <div className="Daily-Forecast-Input-Temp">
                                        <p style={{margin:0}} className="Daily-Forecast-Input-Min">{Math.round(element.minTemp)}°</p>

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
                                        <p className="Daily-Forecast-Input-Max">{Math.round(element.maxTemp)}°</p>
                                    </div>

                                </motion.div>

                            </>
                        )
                    })}
                </motion.div>
        </>
    )   
}