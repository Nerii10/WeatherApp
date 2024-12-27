import { motion } from "framer-motion"
import { FadeInType1 } from "../MotionVariant1"

export default function Text({ Text,WordGap,WordDelay,Center }) {

    return(
        <>
        <div style={{
        display: "flex",
        gap: `${WordGap}`,
        justifyContent: Center == true ? "center" : "flex-start", 
        }}>


        {Text.map((text,index) => {
            return (
            <motion.h1
            variants={FadeInType1("down", index*WordDelay)} 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            >{text}
            </motion.h1>   
            )
        })}
        </div>
        </>
    )
  }
  