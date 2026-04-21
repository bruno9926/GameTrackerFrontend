import { anim, type AnimationProps} from "@shared/ui/Animations";

const AnimatedRoute = ({ children, ...props }: AnimationProps) => {
  return (
    <anim.FadeInUp {...props}>
      {children}
    </anim.FadeInUp>
  );
};
export default AnimatedRoute;
