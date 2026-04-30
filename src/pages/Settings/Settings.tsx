import AnimatedRoute from "../AnimatedRoute";
import ThemeToggle from "@shared/ui/ThemeToggle/ThemeToggle";
import SettingsSection from "@features/settings/ui/SettingsSection";
import UserSection from "@features/settings/ui/UserSection";
import AccountAndSecuritySection from "@features/settings/ui/AccountAndSecuritySection";

const Settings = () => {
  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-5 page-padding header-safe-area">
        {/* Settings Sections */}
        <div className="flex flex-col gap-7">
          {/* Only Mobile */}
          <div className="md:hidden block mx-auto w-full max-w-4xl">
            <h1>Settings</h1>
          </div>

          <UserSection />
          <AccountAndSecuritySection />
          <AppearanceSection />
        </div>
      </div>
    </AnimatedRoute>
  );
};

const AppearanceSection = () => {
  return (
    <SettingsSection title="Appearance" id="appearance">
      <div className="card">
        <ThemeToggle />
      </div>
    </SettingsSection>
  )
}



export default Settings;
