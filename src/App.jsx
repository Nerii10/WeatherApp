import { useState, useEffect } from "react";
import SearchMenu from "./assets/SeachMenu";
import WeatherData from "./assets/WeatherData";
import Navbar from "./assets/Nav";
import Text from "./assets/Text";
import { WeatherImages } from "./assets/WeatherImages";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const CurrentDate = new Date();
  const OffsetInSeconds = weatherData?.timezone || 0; 
  const UTCDate = new Date(CurrentDate.getTime() + CurrentDate.getTimezoneOffset()  * 1000); 
  const LocalTime = new Date(UTCDate.getTime() + OffsetInSeconds * 1000);
  const Hour = LocalTime.getUTCHours();
  const Minutes = LocalTime.getUTCMinutes();
  const FullTime = `${Hour.toString().padStart(2, '0')}:${Minutes.toString().padStart(2, '0')}`;
  

  useEffect(() => {
    const getBackgroundColor = () => {
      document.body.style.transition = "1s ease"  
      if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
        document.body.style.backgroundColor = "#091f5056"; 

        return;
      }

      const description = weatherData.weather[0].description.toLowerCase();
      if (description.includes("clear")) {
        if (Hour >= 3 && Hour < 14) {
          document.body.style.backgroundColor = "#1990ff"; 
        } else if (Hour >= 14 && Hour < 18) {
          document.body.style.backgroundColor = "#004a8f";
        } else {
          document.body.style.backgroundColor = "#030e24"; 
        }
      } else if (description.includes("rain")) {
        if (Hour >= 3 && Hour < 14) {
          document.body.style.backgroundColor = "#add1ff"; 
        } else if (Hour >= 14 && Hour < 18) {
          document.body.style.backgroundColor = "#668cbd"; 
        } else {
          document.body.style.backgroundColor = "#405e85";  
        }
      } else if (description.includes("cloudy") || description.includes("clouds")) {
        if (Hour >= 3 && Hour < 14) {
          document.body.style.backgroundColor = "#9e9e9e"; 
        } else if (Hour >= 14 && Hour < 18) {
          document.body.style.backgroundColor = "#616161"; 
        } else {
          document.body.style.backgroundColor = "#262626"; 
        }
      } else if (description.includes("snow")) {
        if (Hour >= 3 && Hour < 14) {
          document.body.style.backgroundColor = "#c2e2ff";
        } else if (Hour >= 14 && Hour < 18) {
          document.body.style.backgroundColor = "#718fab"; 
        } else {
          document.body.style.backgroundColor = "#3e566b"; 
        }
      
      


          

      } else if (description.includes("storm")) {


        document.body.style.backgroundColor = "#2F4F4F";
      
    } if (error) {document.body.style.backgroundColor = "#091f5056"; }
    };

    getBackgroundColor();
  }, [weatherData,error]); 

  return (
    <>
      <Navbar />
      
      <div style={{ height: "100px" }}></div>
      <WeatherImages WeatherInfo={weatherData} Hour={Hour} error={error}/>
      <br></br>
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
          hour={FullTime}
        />
      </div>
    </>
  );
}

export default App;
