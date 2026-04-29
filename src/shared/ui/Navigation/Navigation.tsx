import styles from "./Navigation.module.scss";
import { useState } from "react";
import { NavLink } from "react-router";

const navigationItems = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Games", route: "/games" },
  { label: "Platforms", route: "/platforms" },
  { label: "Settings", route: "/settings" },
];

const Navigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMenu = () => setShowMobileMenu((current) => !current);

  return (
    <>
      {showMobileMenu && (
        <div className={styles.overlay} onClick={toggleMenu} />
      )}

      <div
        className={`${styles.navigation} ${
          showMobileMenu ? styles["show-mobile-menu"] : ""
        }`}
      >
        <nav className={styles["navigation-menu"]}>
          
          <div className="relative w-40 h-15">
            <img src="/logo-light.png" alt="GameTracker" className="dark:hidden girly:hidden absolute inset-0" />
            <img src="/logo-dark.png" alt="GameTracker" className="hidden dark:block absolute inset-0" />
            <img src="/logo-girly.png" alt="GameTracker" className="hidden girly:block absolute inset-0" />
          </div>


          <div className={styles["nav-items"]}>
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.label}
                route={item.route}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </NavigationItem>
            ))}
          </div>
        </nav>
        <MobileController toggleMenu={toggleMenu} />
      </div>
    </>
  );
};

type NavigationItemProps = {
  children: Readonly<React.ReactNode>;
  route: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

const NavigationItem = ({ children, route, ...props }: NavigationItemProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        `${styles["nav-item"]} ${isActive ? styles["active"] : ""}`
      }
      to={route}
    >
      {children}
    </NavLink>
  );
};

interface MobileControllerProps {
  toggleMenu: () => void;
}

const MobileController = ({ toggleMenu }: MobileControllerProps) => {
  return (
    <div className={styles["mobile-controller"]} onClick={toggleMenu}>
      <span>☰</span>
    </div>
  );
};

export default Navigation;
