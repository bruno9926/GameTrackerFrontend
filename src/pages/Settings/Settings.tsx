import AnimatedRoute from "../AnimatedRoute";
import ThemeToggle from "@shared/ui/ThemeToggle/ThemeToggle";
import SettingsSection from "@features/settings/ui/SettingsSection";
import UserSection from "@features/settings/ui/UserSection";

const Settings = () => {
  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-5 page-padding">
        {/* Settings Sections */}
        <div className="flex flex-col gap-7">
          {/* Only Mobile */}
          <div className="md:hidden block mx-auto w-full max-w-4xl">
            <h1>Settings</h1>
          </div>

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
