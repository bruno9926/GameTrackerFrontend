import { type HTMLMotionProps } from "framer-motion";
// animations
import FadeInUp from "./FadeInUp";

export type AnimationProps = HTMLMotionProps<"div"> & {
    children?: React.ReactNode
};

export const anim = {
    FadeInUp,
};