import { useEffect, useState } from 'react'
import React from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Searchbar from './Components/Searchbar/SearchBar'
import Forecast from './Components/Forecast/Forecast'
import CurrentWeather from './Components/CurrentWeather/CurrentWeather'
import SolarCycleGraph from './Components/CurrentWeather/SolarCycleGraph'
import WeatherInput from './Components/WeatherUtils/WeatherInput'

import TEST from './Components/Test'
import BackgroundColorChange from './Components/WeatherUtils/BackgroundColorChanger'
import IconMapper from './Components/WeatherUtils/IconMapper'


import { Cloud, MapPinX } from 'lucide-react'

function App() {  

  const [ForecastHourlyData, setForecastHourlyData] = useState(0)
  const [WeatherData, setWeatherData] = useState(0)
  const [CurrentHour, setCurrentHour] = useState(0)
  const [Error, setError] = useState(0)
  const [ScrollYPx, setScrollYPx] = useState(0)
  const [BackgroundColor1,setBackgroundColor1] = useState("rgb(24, 178, 255)")
  const [BackgroundColor2,setBackgroundColor2] = useState("rgb(149, 183, 205)")

  const CurrentDate = new Date();
  
  useEffect(()=>{
    document.getElementById('htmlelem').style.backgroundColor = BackgroundColor1;
  },[BackgroundColor1])

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
  },[WeatherData])

  useEffect(()=>{
    addEventListener("scroll", ()=>{
      setScrollYPx(window.scrollY)
    })
  },[])

  function TimeToLocalTime(timestamp,timezone){
    if (timezone !== undefined && timezone !== null) {
      const OffsetInSeconds = timezone; 
      const UTCDate = new Date(timestamp + new Date().getTimezoneOffset() * 60 * 1000); 
      const LocalTime = new Date(UTCDate.getTime() + OffsetInSeconds * 1000);
      const Hour = LocalTime.getHours();
      const Minutes = LocalTime.getMinutes();
      return `${Hour.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}`;
    }
  }
  
  
  function FormatTime(timestamp, timezoneOffset) {
    if (!timestamp) return "N/A";
    const date = new Date((timestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${date.getTime()}`;
  }


  
  const Now = TimeToLocalTime(WeatherData?.dt*1000, WeatherData?.timezone)
  const Sunrise = TimeToLocalTime(WeatherData?.sys?.sunrise*1000, WeatherData?.timezone)
  const Sunset = TimeToLocalTime(WeatherData?.sys?.sunset*1000, WeatherData?.timezone)
  
  const BackgroundTime = {Now,Sunrise,Sunset}

  const Day = Now >= Sunrise && Now <= Sunset ? 1 : 0;

  return (
    <>

    <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundSize: "100% 100%",
          zIndex: -1
        }}
        initial={{ background: `linear-gradient(to bottom, ${BackgroundColor1}, ${BackgroundColor2})` }}
        animate={{ background: `linear-gradient(to bottom, ${BackgroundColor1}, ${BackgroundColor2})` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />


    <div 
      style={{
        width: "100%",
        margin: 0,
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >

      <div className='MainContainer'>

        <div style={{height:"20px"}}></div>
      
        <h1 style={{fontSize:"25px", display:'flex', gap: "10px", alignItems:'center'}}> <img src="/WeatherApp/icons/weather-app.png" style={{width:'50px'}}></img> Discover weather</h1>

        <BackgroundColorChange time={BackgroundTime} WeatherData={WeatherData} setBackgroundColor1={setBackgroundColor1} setBackgroundColor2={setBackgroundColor2}/>

        <Searchbar setForecastHourlyData={setForecastHourlyData} setWeatherData={setWeatherData} setError={setError}/> 
       

        {!Error ? 
        <>
          {WeatherData ? 

            <motion.div 
            style={{width:'100%'}}
            initial={{opacity:0, y:200}}
            animate={{opacity:1,y:0}}
            key={WeatherData.name}
            transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23 }}
            >
              <br></br>
                <motion.div style={{display:'flex', justifyContent:"space-between",alignItems:'center',position:'sticky', top:"5px", zIndex:2, padding:"0px 20px"}}
                initial={{y:20,opacity:0,borderRadius:'var(--ForecastBorderRadius)',}}
                animate={ScrollYPx > 175 ? {y:0,opacity:1, borderRadius:'var(--ForecastBorderRadius)', backgroundColor:"var(--ForecastBackground)", backdropFilter:"blur(10px)", border:"var(--ForecastBorder)",scale:0.9} : {y:5,opacity:1, borderRadius:'var(--ForecastBorderRadius)', backgroundColor:"rgba(0,0,0,0)", backdropFilter:"blur(0px)", border:"1px rgba(255,255,255,0) solid", scale:1}}
                transition={{ duration: 0.35, ease: "circOut", type:"tween", damping:23}}
                >
                    
                    <div style={{display:'flex', justifyContent:"center", alignItems:'center', gap:"15px",height:'70px'}}>

                      {WeatherData ? <IconMapper Weather={WeatherData?.weather[0]?.main} Day={Day}/> :
                      ""}

                      <h1 className='h1-app-sticky'>{Math.round(WeatherData?.main.temp)}°</h1>

                      <h1 className='h1-app-sticky'>{WeatherData?.name}</h1>

                    </div>
                
                    <h1  className='h1-app-sticky'>{WeatherData?.TimeUS}</h1> 
                </motion.div>
                <br></br>
              
              <motion.div
              initial={{y:50,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23, delay:0.5 }}
              >

                <Forecast ForecastHourlyData={ForecastHourlyData} />
              </motion.div>
                  
              <br></br>
              <br></br>

              <motion.div
              initial={{y:50,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23, delay:1 }}
              >
                <CurrentWeather WeatherData={WeatherData} />
              </motion.div>

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {/* <TEST Data={WeatherData} /> */}
            
            </motion.div >

          : 
          <>

            <motion.div style={{position:'relative', width:"100%",height:'fit-content', padding:"50px 0px"}}
              initial={{opacity:0, y:50}}
              animate={{opacity:1,y:0}}
              key={WeatherData.name}
              transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23 }}
              >
              <br></br>
              <br></br>
              <br></br>
              <div style={{display:'flex', flexDirection:'row', gap:'20px', justifyContent:'center',alignItems:'center'}}>
                  <Cloud size={50} style={{flexShrink:0}}></Cloud>
                  <div>
                    <h1></h1>
                  </div>
                </div>
                <p style={{position:'absolute',bottom:'0px',width:'100%', display:'flex',justifyContent:'center'}}>Not every city is on the list.</p>
              
            </motion.div>

          </>
          }
          </>
          :
          <>

            <br></br>
            <br></br>
            <br></br>
            <div style={{width:"100%",display:'flex',justifyContent:'center'}}>
              <motion.div style={{width:"90%",boxSizing:'border-box', display:"flex",justifyContent:'center',alignItems:'center',gap:"20px"}}
              initial={{opacity:0, y:200}}
              animate={{opacity:1,y:0}}
              key={WeatherData.name}
              transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23 }}
              >
                <MapPinX size={60} style={{flexShrink:0}}/>
                <h1>Sorry, we couldn't find that city.</h1>
              </motion.div>
            </div>
          
          </>
        }


      </div>
    </div >
    </>
  )
}

export default App;
