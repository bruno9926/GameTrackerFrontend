import AnimatedRoute from "../AnimatedRoute";
import ThemeToggle from "@shared/ui/ThemeToggle/ThemeToggle";
import SettingsSection from "@features/settings/ui/SettingsSection";
import UserSection from "@features/settings/ui/UserSection";

const Settings = () => {
  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-7 page-padding">
        <h1>Settings</h1>
        {/* Settings Sections */}
        <div className="flex flex-col gap-7">
          <UserSection />
          <AppearanceSection />
        </div>
      </div>
    </AnimatedRoute>
  );
};

const AppearanceSection = () => {
  return (
    <SettingsSection title="Appearance" id="appearance">
      <ThemeToggle />
    </SettingsSection>
  )
}



export default Settings;
