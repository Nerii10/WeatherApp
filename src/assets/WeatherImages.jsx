import { motion } from "framer-motion";
import { FadeInType4 } from "../MotionVariant4.jsx";

export function WeatherImages({ WeatherInfo, Hour, error}) {
  const Desc = WeatherInfo?.weather?.[0]?.description?.toLowerCase() || "unknown";

  return (
    <>
    {WeatherInfo && !error ? (
      <motion.div
        className="WeatherAditionalIcons"
        
      >
        <motion.img
        key={WeatherInfo.name}
        variants={FadeInType4("down", 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
  src={
    Desc.includes("clear")
      ? Hour >= 18 || Hour < 3
        ? "/WeatherApp/Moon.png"
        : "/WeatherApp/Sun.png"
      : Desc.includes("clouds") || Desc.includes("cloudy") || Desc.includes("smoke")
      ? Hour >= 18 || Hour < 3
        ? "/WeatherApp/CloudNight.png"
        : "/WeatherApp/CloudDay.png"
      : Desc.includes("snow")
      ? Hour >= 18 || Hour < 3
        ? "/WeatherApp/SnowflakeNight.png"
        : "/WeatherApp/SnowflakeDay.png"
      : Desc.includes("haze") || Desc.includes("mist") || Desc.includes("fog") || Desc.includes("smoke")
      ? Hour >= 18 || Hour < 3
      ? "/WeatherApp/MistNight.png"
      : "/WeatherApp/MistDay.png"
      : Desc.includes("rain")
      ? Hour >= 18 || Hour < 3
        ? "/WeatherApp/RainNight.png"
        : "/WeatherApp/RainDay.png"
      : ""
  }
  className="WeatherIcon"
/>

      </motion.div>
    ) : (
      <motion.div
        className="WeatherAditionalIcons"
        key={WeatherInfo ? WeatherInfo.name : ""}
      >
      </motion.div>
    )}
  </>
  
  );
}
