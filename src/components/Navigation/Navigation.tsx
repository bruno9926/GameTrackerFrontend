import styles from './Navigation.module.scss';
import { useState } from 'react';

const navigationItems = [
  { label: 'Dashboard', active: true },
  { label: 'Games' },
  { label: 'Platforms' },
  { label: 'Settings' },
];

import Logo from '../../assets/logo.png';

const Navigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMenu = () => setShowMobileMenu(current => !current);

  return (
    <>
      {showMobileMenu && (
        <div
          className={styles.overlay}
          onClick={toggleMenu}
        />
      )}

      <div
        className={`${styles.navigation} ${showMobileMenu ? styles['show-mobile-menu'] : ''}`}
      >
        <nav className={styles['navigation-menu']}>
          <img className={styles.logo} src={Logo} alt="GameTracker" />
          <div className={styles['nav-items']}>
            {navigationItems.map((item) => (
              <NavigationItem key={item.label} active={item.active}>
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

interface NavigationItemProps {
  children: Readonly<React.ReactNode>;
  active?: boolean;
}

const NavigationItem = ({ children, active }: NavigationItemProps) => {
  return (
    <div className={`${styles['nav-item']} ${active ? styles['active'] : ''}`}>
      {children}
    </div>
  );
};

interface MobileControllerProps {
  toggleMenu: () => void;
}

const MobileController = ({ toggleMenu }: MobileControllerProps) => {
  return (
    <div className={styles['mobile-controller']} onClick={toggleMenu}>
      <span>☰</span>
    </div>
  );
};

export default Navigation;
