import { useEffect, useState } from 'react'
import React from 'react'
import { motion } from 'motion/react'

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
    console.log(WeatherData)
  },[WeatherData])

  function FormatTime(timestamp, timezoneOffset) {
    if (!timestamp) return "N/A";
    const date = new Date((timestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${date.getTime()}`;
  }

  const Now = new Date(WeatherData?.dt * 1000 + WeatherData?.timezone * 1000);
  const Sunrise = new Date(WeatherData?.sys?.sunrise * 1000 + WeatherData?.timezone * 1000); 
  const Sunset = new Date(WeatherData?.sys?.sunset * 1000 + WeatherData?.timezone * 1000); 


  const Day = Now >= Sunrise && Now <= Sunset ? 1 : 0;
  console.log(Day)

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
      
        <h1 style={{fontSize:"25px"}}>Weather</h1>
        <BackgroundColorChange time={WeatherData?.TimeLocal} WeatherData={WeatherData} setBackgroundColor1={setBackgroundColor1} setBackgroundColor2={setBackgroundColor2}/>

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
              <motion.div style={{display:'flex', justifyContent:"space-between",alignItems:'center',position:'sticky', top:"0px", zIndex:2, borderRadius:'var(--ForecastBorderRadius)', backgroundColor:"var(--ForecastBackground)", backdropFilter:"blur(10px)", border:"var(--ForecastBorder)", padding:"0px 20px"}}
              initial={{y:20,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23, delay:0.2 }}
              >
                  
                  <div style={{display:'flex', justifyContent:"center", alignItems:'center', gap:"15px",height:'70px'}}>

                    {WeatherData ? <IconMapper Weather={WeatherData?.weather[0]?.main} Day={Day}/> :
                    ""}

                    <h1 style={{margin:0,fontSize:"25px"}}>{Math.round(WeatherData?.main.temp)}°</h1>

                    <h1 style={{margin:0,fontSize:"25px"}}>{WeatherData?.name}</h1>

                  </div>
              
                  <h1 style={{margin:0,fontSize:"25px"}}>{WeatherData?.TimeUS}</h1> 
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
            <br></br>
            <br></br>
            {/* <TEST Data={WeatherData} /> */}
           
          </motion.div >
          : 
          <>
            <motion.div style={{position:'relative', width:"100%",height:'90vh'}}
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
                  <h1>Let's discover</h1>
                </div>
              </div>
              <p style={{position:'absolute',bottom:'150px',width:'100%', display:'flex',justifyContent:'center'}}>Not every city is on the list.</p>
            
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
