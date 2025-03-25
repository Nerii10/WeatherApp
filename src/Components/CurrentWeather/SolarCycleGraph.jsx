import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function SolarCycleGraph({ WeatherData }) {
  const [DayProgress, setDayProgress] = useState(0);
  const [Mouse, setMouse] = useState(0)

  useEffect(() => {
    if (WeatherData?.TimeLocal) {
      const hours = parseInt(WeatherData.TimeLocal.slice(0, 2));
      const minutes = parseInt(WeatherData.TimeLocal.slice(3, 5));
      const totalHours = hours + minutes / 60;
      setDayProgress((totalHours / 24) * 100);
    }
  }, [WeatherData]);

  function FormatTime(timestamp, timezoneOffset) {
    if (!timestamp) return "N/A";
    const date = new Date((timestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  function FormatTimeUS(timestamp, timezoneOffset) {
    if (!timestamp) return "N/A";
    const date = new Date((timestamp + timezoneOffset) * 1000);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const ampm = hours < 12  ? "am" : "pm"
    hours = hours%12 || 12

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${ampm}`;
  }

  function timeStringToPercent(timeStr) {
    const hours = parseInt(timeStr.slice(0, 2));
    const minutes = parseInt(timeStr.slice(3, 5));
    const totalHours = hours + minutes / 60;
    return (totalHours / 24) * 100;
  }

  function calculateDaytimeY(x) {
    const t = (x - graphsunrise) / (graphsunset - graphsunrise);
    const P0 = 50;
    const P1 = 50 - Math.abs(graphsunset - graphsunrise) / 2;
    const P2 = 50;
    return (1 - t) * (1 - t) * P0 + 2 * (1 - t) * t * P1 + t * t * P2;
  }

  function calculateNighttimeY(x) {
    if (x < graphsunrise) {
      const t = x / graphsunrise;
      return 70 - (70 - 50) * t;
    } else {
      const t = (x - graphsunset) / (100 - graphsunset);
      return 50 + (70 - 50) * t;
    }
  }

  const Sunrise = FormatTime(WeatherData?.sys?.sunrise, WeatherData?.timezone ?? 0);
  const Sunset = FormatTime(WeatherData?.sys?.sunset, WeatherData?.timezone ?? 0);

  const graphsunrise = timeStringToPercent(Sunrise);
  const graphsunset = timeStringToPercent(Sunset);

  const circleY =
    DayProgress >= graphsunrise && DayProgress <= graphsunset
      ? calculateDaytimeY(DayProgress)
      : calculateNighttimeY(DayProgress);

    const totalMinutes = ((Mouse?.X || 0) / 100) * 24 * 60; 
    const hour24 = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    const hour12 = (hour24 % 12) || 12;
    const paddedHour = hour12 < 10 ? `0${hour12}` : hour12; 
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const period = hour24 < 12 ? "AM" : "PM"; 

    const formattedTime = `${paddedHour}:${paddedMinutes} ${period}`;

      
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          borderRadius: "20px",
          position:"relative",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
        onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
            setMouse({X:xPercent,Y:yPercent})
            }}
            onMouseLeave={()=>{setMouse({X:0,Y:0})}}
        onTouchMove= {(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
          const yPercent = ((event.clientY - rect.top) / rect.height) * 100;
          setMouse({X:xPercent,Y:yPercent})
          }}  
        onTouchEnd={()=>{setMouse({X:0,Y:0})}}
      >

        <svg viewBox="0 0 100 100" width="100%" height="100%"
        >
        <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="rgb(123, 123, 123)" />
            <stop offset="1%" stopColor="rgba(22, 22, 22, 0)" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="rgb(255, 255, 255)" />
            <stop offset="2%" stopColor="rgb(123, 123, 123)" />
            </linearGradient>

        </defs>
        
        <path
            d={`M0 70 ${graphsunrise} 50, ${graphsunset} 50, 100 70`}
            stroke="url(#curveGradient)"
            fill="none"
            strokeWidth="2"
        />
        <path
            d={`M${graphsunrise} 50, Q${(Math.abs(graphsunrise - graphsunset) / 2) + graphsunrise} ${50 - Math.abs(graphsunrise - graphsunset) / 2}, ${graphsunset} 50`}
            stroke="url(#lineGradient)"
            fill="none"
            strokeWidth="2"
        />
        <line
            x1="0"
            y1="50"
            x2="100"
            y2="50"
            stroke="white"
            strokeWidth="1"
        />

      <defs>
      <mask id="colorMask">
      <rect x="0" y="0" width="200" height="200" fill="white" />
      <rect x="0" y="50" width="100" height="50" fill="gray" />
    </mask>

      </defs>


      {WeatherData?.TimeLocal && (
          <circle
            cx={DayProgress}
            cy={circleY}
            r={5}
            fill={
              DayProgress >= graphsunrise && DayProgress <= graphsunset
                ? "rgb(255, 176, 19)"
                : DayProgress < graphsunrise
                ? "rgb(113, 175, 245)"
                : "rgb(92, 38, 178)"
            }
            mask="url(#colorMask)" 
          />
        )}

        <text x="20" y="30" textAnchor="middle" fontSize="6" fill="white">
            {FormatTimeUS(WeatherData?.sys?.sunrise, WeatherData?.timezone ?? 0)}
        </text>
        <text x="80" y="30" textAnchor="middle" fontSize="6" fill="white">
            {FormatTimeUS(WeatherData?.sys?.sunset, WeatherData?.timezone ?? 0)}
        </text>
        </svg>
        <motion.div 
        style={{
            position: "absolute",
            display: Mouse?.X ? "block" : "block", 
            top:"0px",
            pointerEvents: "none",
            willChange:"transform",
            zIndex:1
        }}
        animate={{x:Mouse?.X ? Mouse?.X*2 : 100, opacity: Mouse?.X ? 1 : 0}}
        >
            <motion.p style={{
                backgroundColor:"rgba(94, 94, 94, 0.5)",
                backdropFilterfilter:"blur(5px)",
                borderRadius:"10px",
                pointerEvents: "none",
                userSelect: "none",
                cursor: "default",
                willChange:"transform",
                marginLeft:"-50%",
                color: Mouse?.X ? "white" : "transparent",
                padding:"5px",
                width:"70px",
            }}
            animate={{x: Mouse.X ? (Mouse?.X-50)*-1 : 0}}
            >
            {Mouse?.X > 0.1 ? (
                <>
                {formattedTime}
                </>
            ) : "12:00 AM"}
            </motion.p >

            <div style={{position:"absolute", top:"30px" ,height:"500%", background: "linear-gradient(to bottom, transparent, white 50%, transparent)",zIndex:-1, width:"1px"}}>
            </div>
        </motion.div >


      </div>
    </>
  );
}
