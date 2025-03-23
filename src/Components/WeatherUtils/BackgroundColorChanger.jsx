import { useEffect } from "react";

export default function BackgroundColorChange({ time, WeatherData, setBackgroundColor1, setBackgroundColor2 }) {
  const Colors = {
    day: ["rgb(0, 177, 247)", "rgb(0, 4, 242)"],  
    night: ["rgb(18, 32, 47)", "rgb(7, 6, 77)"], 
    morning: ["rgb(255, 155, 90)", "rgb(255, 210, 125)"], 
    afternoon: ["rgb(136, 209, 238)", "rgb(8, 82, 255)"],  
    dusk: ["rgb(255, 99, 71)", "rgb(204, 85, 85)"], 
    twilight: ["rgb(70, 61, 139)", "rgb(255, 38, 0)"], 
    overcast: ["rgb(169, 169, 169)", "rgb(128, 128, 128)"], 
    storm: ["rgb(0, 14, 21)", "rgb(47, 79, 79)"], 
    sunset: ["rgb(255, 140, 0)", "rgb(255, 69, 0)"]
  };

  useEffect(() => {
    if (!time) return;

    const currentHour = parseInt(time.slice(0, 2), 10);
    const WeatherCondition = WeatherData?.weather[0]?.main;

    console.log(WeatherCondition);

    let newColors = [];

    if (WeatherCondition === "Rain") {
      newColors = Colors.storm;
    } else {
      if (currentHour < 6) {
        newColors = Colors.night;
      } else if (currentHour < 9) {
        newColors = Colors.morning;
      } else if (currentHour < 12) {
        newColors = Colors.afternoon;
      } else if (currentHour < 15) {
        newColors = Colors.day;
      } else if (currentHour < 18) {
        newColors = Colors.day;
      } else if (currentHour < 20) {
        newColors = Colors.twilight;
      } else {
        newColors = Colors.night;
      }
    }

    setBackgroundColor1(newColors[0]);
    setBackgroundColor2(newColors[1]);
  }, [time, WeatherData, setBackgroundColor1, setBackgroundColor2]); 
}
