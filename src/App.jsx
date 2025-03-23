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
              <motion.div style={{display:'flex', justifyContent:"space-between",alignItems:'center'}}
              initial={{x:20,opacity:0}}
              animate={{x:0,opacity:1}}
              transition={{ duration: 1, ease: "easeOut", type:"spring", damping:23, delay:0.2 }}
              >
                  
                  <div style={{display:'flex', justifyContent:"center", alignItems:'center', gap:"10px",height:'100px'}}>
                    <p style={{fontSize:'50px', margin:0,flexShrink:0}}>
                      {WeatherData ? <IconMapper Weather={WeatherData?.weather[0]?.main}/> :
                      ""}
                      </p>
                    <h1 style={{margin:0}}>{WeatherData?.name}</h1>
                  </div>
              
                  <h1>{WeatherData?.TimeUS}</h1> 
              </motion.div>
            
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
