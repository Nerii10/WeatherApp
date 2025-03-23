import { useState, useEffect } from "react";

export default function SolarCycleGraph({ WeatherData }) {

    const [DayProgress, setDayProgress] = useState(0);

    useEffect(() => {
        setDayProgress(WeatherData?.TimeLocal ? ((WeatherData.TimeLocal.slice(0,2) / 24) * 100) : 0)
      }, [WeatherData]);
      
    function FormatTime(timestamp) {
        if (!timestamp) return "N/A";
        const date = new Date(timestamp * 1000); 
        const minutes = date.getMinutes();
        let hours = date.getHours();
    
        const ampm = hours >= 12 ? "pm" : "am";
    
        hours = hours % 12;
        hours = hours ? hours : 12; 
    
        return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}${ampm}`;
    }

    function calculateY(x) {
        const t = x / 100; 
        const p0 = 70;
        const p1 = 50; 
        const p2 = 50; 
        const p3 = 70; 
        
        return (1 - t) * (1 - t) * p0 + ((Math.abs((DayProgress*0.01) - 0.5) * 3) < 0.3 ? 0.4 : (Math.abs((DayProgress*0.01) - 0.5) * 3)) * (1 - t) * t * p1 + t * t * p3;
    }

    const Sunrise = FormatTime(WeatherData ? WeatherData.sys.sunrise : 0);
    const Sunset = FormatTime(WeatherData ? WeatherData.sys.sunset : 0);

    return (
        <div style={{
            width: "100%",
            height:"100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            borderRadius: "20px",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}>
         
         
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="10%" stop-color="rgb(255,255,255)" />
                    <stop offset="35%" stop-color="rgb(92, 92, 92)" />
                    </linearGradient>

                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="10%" stop-color="rgb(206, 32, 32)" />
                    <stop offset="35%" stop-color="rgb(244, 7, 7)" />
                    </linearGradient>
                </defs>
    
                <path d="M0 70 T25 50 ,75 50 , 100,70" 
                stroke="url(#curveGradient)" strokeWidth="2" fill="none" />

                <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth={1}/>

                {WeatherData?.TimeLocal &&
                    <circle
                    cx={DayProgress}
                    cy={calculateY(DayProgress)}
                    r={5}
                    floodColor={"red"}
                    fill={DayProgress >= 25 && DayProgress <= 74
                        ? "rgb(255, 200, 19)"
                        : DayProgress < 25
                        ? "rgb(39, 83, 134)" 
                        : "rgb(115, 49, 176)"}
                      
                    />
                }

                <text x={20} y={30} textAnchor="middle" fontSize="6" fill="white">{Sunrise}</text>
                <text x={80} y={30} textAnchor="middle" fontSize="6" fill="white">{Sunset}</text>

            </svg>
        </div>
    );
}
