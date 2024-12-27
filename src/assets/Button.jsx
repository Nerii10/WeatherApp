import { motion } from 'framer-motion';

const style = {
  border: "none",
  color: "black",
  backgroundColor: "white",
  borderRadius: "20px",
  paddingInline:"20px"
};

const Button = ({ onClick }) => {
  return (
    <motion.button
      style={style}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
    >
      Search
    </motion.button>
  );
};

export default Button;
