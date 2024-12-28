import { useState } from "react";
import Button from "./Button";
import { cities } from "./Cities";
import { motion } from "framer-motion";
import { FadeInType3 } from "../MotionVarian3";
function SearchMenu({ setWeatherData, setError, setInputValue, inputValue }) {
  const [city, setCity] = useState("");
  const [FilteredCities, setFilteredCities] = useState([])

  const searchWeather = async (city) => {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        setError(true);
        console.error("Data Download Error");
        return;
      } else {
        setError(false);
        const data = await response.json();
        setWeatherData(data); 
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);  
    const filtered = cities.filter(city => city.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredCities(filtered);
  };
  
  const handleCityChange = (cityName) => {
    if (cityName) {
      setCity(cityName);
      searchWeather(cityName);
      setInputValue(""); // Reset input after selecting a city
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && FilteredCities.length > 0) {
      handleCityChange(FilteredCities[0].name);  // Select the first city if Enter is pressed
    }
  };
  
  return (
    <>
      <motion.div className="SearchMenu"
        variants={FadeInType3("down", 0)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
  
        <div className="Inputs">
          <input
            type="text"
            className="InputText"
            placeholder="City Name"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          
          <Button onClick={() => handleCityChange(inputValue)} />
        </div>
  
        {/* Show the list only if there is input and cities to display */}
        {inputValue !== "" && FilteredCities.length > 0 && (
          <div className="SearchList">
            {FilteredCities.map((city, index) => (
              <h3
                key={index}
                className="CitySearchHint"
                onClick={() => handleCityChange(city.name)} // Pass the city name to handleCityChange
              >
                {city.name}
              </h3>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
  
}

export default SearchMenu;
