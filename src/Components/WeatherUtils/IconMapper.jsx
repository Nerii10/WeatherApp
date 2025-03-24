import { Cloudy } from "lucide-react"
import { i } from "motion/react-client";

export default function IconMapper({Weather, Day}){

    const day = Day == undefined ? 1 : Day

    const path = "/WeatherApp/icons/";

    return(

        <p>
            {(() => {
                switch (Weather) {
                case "Cloudy":
                case "Clouds":
                    if(day == 1) {
                        return <img src={`${path}CloudDay.png`} className="icon"></img>;
                    } else {
                        return <img src={`${path}CloudNight.png`} className="icon"></img>;
                    }
                case "Rain":
                case "Thunderstorm":
                    if(day == 1) {
                        return <img src={`${path}RainDay.png`} className="icon"></img>;
                    } else {
                        return <img src={`${path}RainNight.png`} className="icon"></img>;
                    }
                case "Clear":
                    if(day == 1) {
                        return <img src={`${path}Sun.png`} className="icon"></img>;
                    } else {
                        return <img src={`${path}Moon.png`} className="icon"></img>;
                    }
                case "Snow":
                    if(day == 1) {
                        return <img src={`${path}SnowDay.png`} className="icon"></img>;
                    } else {
                        return <img src={`${path}SnowNight.png`} className="icon"></img>;
                    }
                case "Mist":
                case "Haze":
                    if(day == 1) {
                        return <img src={`${path}MistDay.png`} className="icon"></img>;
                    } else {
                        return <img src={`${path}MistNight.png`} className="icon"></img>;
                    }
                default:
                    return `🌍 ${Weather}`; 
                }
            })()}
        </p>


    )

}