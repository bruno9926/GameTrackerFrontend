import AnimatedRoute from "../AnimatedRoute";
import ThemeToggle from "@shared/ui/ThemeToggle/ThemeToggle";


const Settings = () => {
  return (
    <AnimatedRoute>
      <h1>Settings</h1>
      <ThemeToggle/>
    </AnimatedRoute>
  );
};

export default Settings;
