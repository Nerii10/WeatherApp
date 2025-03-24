import { useEffect } from "react";

export default function BackgroundColorChange({ time, WeatherData, setBackgroundColor1, setBackgroundColor2 }) {
  const Colors = {
    day: ["rgb(0, 177, 247)", "rgb(25, 0, 255)"],  
    night: ["rgb(43, 67, 93)", "rgb(8, 7, 51)"], 
    morning: ["rgb(255, 155, 90)", "rgb(255, 210, 125)"], 
    sunrise: ["rgb(59, 56, 82)", "rgb(255, 210, 125)"], 
    afternoon: ["rgb(136, 209, 238)", "rgb(8, 82, 255)"],  
    dusk: ["rgb(255, 105, 75)", "rgb(252, 177, 90)"], 
    twilight: ["rgb(70, 61, 139)", "rgb(255, 38, 0)"], 
    overcast: ["rgb(169, 169, 169)", "rgb(128, 128, 128)"], 
    storm: ["rgb(0, 14, 21)", "rgb(47, 79, 79)"], 
    sunset: ["rgb(255, 140, 0)", "rgb(255, 69, 0)"]
  };

  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  useEffect(() => {
    if (!time || !time.Now || !time.Sunrise || !time.Sunset) return; // Zabezpieczenie, aby nie było błędów, gdy `time` lub inne dane są undefined

    const { Now, Sunrise, Sunset } = time;

    const currentHour = new Date().getHours(); // Aktualna godzina w systemie 24-godzinnym
    const WeatherCondition = WeatherData && WeatherData?.weather[0]?.main;

    const nowInMinutes = convertToMinutes(Now);
    const sunriseInMinutes = convertToMinutes(Sunrise);
    const sunsetInMinutes = convertToMinutes(Sunset);

    let newColors = [];

    console.log(Math.abs(sunriseInMinutes - nowInMinutes), "Min do wschodu")
    console.log(Math.abs(sunsetInMinutes - nowInMinutes), "Min do zachodu")
    
    if (WeatherCondition === "Rain") {
      newColors = Colors.storm;
    } else {

      if (Math.abs(sunriseInMinutes - nowInMinutes) < 60) { 
        newColors = Colors.sunrise; 
      } 
      else if (Math.abs(sunsetInMinutes - nowInMinutes) < 60) {
        newColors = Colors.dusk; 
      } 
      else if (nowInMinutes < sunriseInMinutes) {
        newColors = Colors.night; 
      } else if (nowInMinutes < sunriseInMinutes + 60) {
        newColors = Colors.morning; 
      } else if (nowInMinutes < 720) { 
        newColors = Colors.afternoon; 
      } else if (nowInMinutes < sunsetInMinutes) {
        newColors = Colors.day; 
      } else if (nowInMinutes < sunsetInMinutes + 60) {
        newColors = Colors.dusk; 
      } else {
        newColors = Colors.night;
      }
    }

    setBackgroundColor1(newColors[0]);
    setBackgroundColor2(newColors[1]);
  }, [time, WeatherData, setBackgroundColor1, setBackgroundColor2]);
}
