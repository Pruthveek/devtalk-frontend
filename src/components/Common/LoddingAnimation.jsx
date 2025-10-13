import { motion } from "framer-motion";

const LoddingAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.h1
        className="text-3xl md:text-9xl font-bold relative text-black"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 2, opacity: 2 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        DEVTALK
        {/* Shine effect overlay */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-600 bg-clip-text text-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "linear",
          }}
        >
          DEVTALK
        </motion.span>
      </motion.h1>
    </div>
  )
}

export default LoddingAnimation;