import { useState, useEffect } from "react";
import SearchMenu from "./assets/SeachMenu";
import WeatherData from "./assets/WeatherData";
import Navbar from "./assets/Nav";
import Text from "./assets/Text";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const getBackgroundColor = () => {
      document.body.style.transition = "2s ease"  
      if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
        document.body.style.backgroundColor = "#091f5056"; 

        return;
      }

      const description = weatherData.weather[0].description.toLowerCase();
      if (description.includes("clear")) {
        document.body.style.backgroundColor = "#09a9e9"; 
      } else if (description.includes("rain")) {
        document.body.style.backgroundColor = "#B0C4DE"; 
      } else if (description.includes("cloudy")) {
        document.body.style.backgroundColor = "#A9A9A9"; 
      } else if (description.includes("clouds")) {
        document.body.style.backgroundColor = "#A9A9A9"; 
      } else if (description.includes("snow")) {
        document.body.style.backgroundColor = "#F0F8FF";
      } else if (description.includes("storm")) {
        document.body.style.backgroundColor = "#2F4F4F";
      
    } if (error) {document.body.style.backgroundColor = "#091f5056"; }
    };

    getBackgroundColor();
  }, [weatherData,error]); 

  return (
    <>
      <Navbar />
      <div style={{ height: "200px" }}></div>

      <Text Text={['Discover', 'weather', 'nearby!']} WordGap="10px" WordDelay={0.3} Center={true} />

      <br /><br />

      <div className="SearchMenuContainer">
        <SearchMenu
          setWeatherData={setWeatherData}
          setError={setError}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
        <br />
        <WeatherData
          weatherData={weatherData}
          error={error}
          inputValue={inputValue}
        />
      </div>
    </>
  );
}

export default App;
