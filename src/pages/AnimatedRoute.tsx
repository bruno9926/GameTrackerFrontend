import { motion } from "framer-motion";

const AnimatedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="dashboard"
    >
      {children}
    </motion.div>
  );
};
export default AnimatedRoute;
