import { motion } from "framer-motion"
import { FadeInType2 } from "../MotionVariant2"
export default function Navbar(){

    return( 
        <>
        <motion.div className="NavbarContainer"
         initial="hidden"
         variants={FadeInType2("down")} 
         whileInView="show"
         viewport={{ once: true }}
         >
            <div className="Navbar">
                <h1>Mobile Weather App</h1>
                <img src="/WeatherApp/weather-app.png" className="icon"></img>
            </div>
        </motion.div>
        </>
    )

}