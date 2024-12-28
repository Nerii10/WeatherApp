import { motion } from "framer-motion";
import { FadeInType1 } from "../MotionVariant1";
function WeatherData({ weatherData, error, inputValue }) {
  if (!inputValue && !weatherData) {
    return null; // Jeśli brak danych i brak inputValue, nie renderuj nic
  }

  return (
    <div 
    style={{ display: "flex", justifyContent: "center", padding: "20px" }}
    >
      {error ? (
        <p>Try Again</p>
      ) : weatherData ? (
        <motion.div className="DataContainer"
        variants={FadeInType1("down")} 
        initial="hidden"
        whileInView="show"
        key={weatherData ? weatherData.name : 'no-data'}
        viewport={{ once: true }}
        >
            <motion.h1
             variants={FadeInType1("down")} 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true }}
             >{weatherData.name}</motion.h1>
            <motion.h2
            variants={FadeInType1("down")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >{Math.floor(weatherData.main.temp)} °C</motion.h2>
        
          {/* Każda dana w osobnym divie z klasą Data */}
          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Feels Like</h3>
            <h2>{Math.floor(weatherData.main.feels_like)} °C</h2>
            <br></br>
            {weatherData.main.feels_like > weatherData.main.temp ? <h2>It feels warmer than it is</h2> : <h2>It feels colder than it is</h2>}
          </motion.div>

          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Weather</h3>
            <h2>{weatherData.weather[0].description}</h2>
            <h1></h1>
          </motion.div>

          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Humidity</h3>
            <h2>{weatherData.main.humidity}%</h2>
            <h1></h1>
          </motion.div>

          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Pressure</h3>
            <h2>{weatherData.main.pressure} hPa</h2>
          </motion.div>

          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Wind Speed</h3>
            <h2>{weatherData.wind.speed} m/s</h2>
          </motion.div>

          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Wind Direction</h3>
            <h2>{weatherData.wind.deg}°</h2>
          </motion.div>
          
          <motion.div className="Data"
            variants={FadeInType1("left")} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: false }}
            >
            <h3>Visibility</h3>
            <h2>{(weatherData.visibility / 1000).toFixed(0)} mi</h2>
          </motion.div>
        </motion.div>
      ) : (
        <p>Input Valid City</p>
      )}
    </div>
  );
}

export default WeatherData;
