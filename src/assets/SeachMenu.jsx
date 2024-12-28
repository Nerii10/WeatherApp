import { useState } from "react";
import Button from "./Button";
import { cities } from "./Cities";


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
        setWeatherData(data);  // Aktualizujemy weatherData w App.js
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);  // Ustawiamy inputValue w App.js

      const filtered = cities.filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredCities(filtered);
  };

  const handleCityChange = (event) => {
    if (inputValue) {
      if(FilteredCities[0])
      {
        setCity(FilteredCities[0].name);
        searchWeather(FilteredCities[0].name);
        setInputValue("")
      } else
      {
        setCity(inputValue);
        searchWeather(inputValue);
        setInputValue("")
      }

    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setInputValue("")
      handleCityChange();
    }
  };

  return (
    
    <div className="SearchMenu">

      <div className="Inputs">
        <input
          type="text"
          className="InputText"
          placeholder="City Name"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        
        <Button onClick={handleCityChange} />
      </div>
      
      {!inputValue == "" && <div className="SearchList">
      {FilteredCities.map((city,index) => <h3>{city.name}</h3>)}
      </div>
      }



    </div>
  );
}

export default SearchMenu;
