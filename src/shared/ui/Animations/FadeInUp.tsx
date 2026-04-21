import { motion } from "framer-motion";
import type {AnimationProps} from "./index";

const FadeInUp = ({
    children,
    initial,
    animate,
    transition,
    ...rest
}: AnimationProps) => {
  return (
    <motion.div
      initial={initial ?? { opacity: 0, y: 50 }}
      animate={animate ?? { opacity: 1, y: 0 }}
      transition={transition ?? { duration: 0.5 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
export default FadeInUp;
