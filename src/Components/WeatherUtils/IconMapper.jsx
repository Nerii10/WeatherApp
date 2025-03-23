import { Cloudy } from "lucide-react"

export default function IconMapper({Weather}){
   
    return(

        <p>
            {(() => {
                switch (Weather) {
                case "Cloudy":
                case "Clouds":
                    return "☁️";
                case "Rain":
                    return "🌧️";
                case "Clear":
                    return "☀️"; 
                case "Snow":
                    return "❅";
                default:
                    return `🌍 ${Weather}`; 
                }
            })()}
        </p>


    )

}