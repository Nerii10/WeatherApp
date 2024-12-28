import { useState } from "react";
import SearchMenu from "./assets/SeachMenu";
import WeatherData from "./assets/WeatherData";
import Navbar from "./assets/Nav";
import Text from "./assets/Text";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Navbar></Navbar>

      <div style={{height: "200px"}}></div>

      <Text Text={['Weather','app','by','nerii']} WordGap="10px" WordDelay={0.3} Center={true}/>

      <br></br><br></br>

      <div className="SearchMenuContainer">
        <SearchMenu
          setWeatherData={setWeatherData}
          setError={setError}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
        <br></br>
        <WeatherData
          weatherData={weatherData}
          error={error}
          inputValue={inputValue}
        />
      </div>


      
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      
    </>
  );
}

export default App;
