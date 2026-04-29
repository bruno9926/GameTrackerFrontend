import User from './User';
import Notifications from './Notifications';
import PageTitle from './PageTitle';
import Search from './Search';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scroll state if vertical scroll is more than 20px
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shared styles across all viewports
  const baseStyles = "w-full flex justify-between items-center gap-4 p-4 z-(--z-navbar) transition-all duration-300";

  // Mobile specific logic: Fixed position and scroll-dependent appearance
  const mobileStyles = clsx(
    "top-0 left-0 fixed", 
    isScrolled 
      ? "bg-background/90 backdrop-blur-md h-14" 
      : "bg-transparent h-20"
  );

  // Desktop specific logic: Revert to static flow and reset mobile-only styles
  const desktopStyles = "md:static md:top-auto md:h-20 md:bg-transparent md:border-none md:p-0";

  return (
    <header className={clsx(baseStyles, mobileStyles, desktopStyles)}>
      <div className='flex items-center gap-8'>
        {/* Mobile Logo: visible only on small screens, adjusts opacity on scroll */}
        <div className={clsx(
          "md:hidden flex justify-center items-center w-8 h-8 transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-60"
        )}>
          <span className="font-extrabold text-brand text-xl italic tracking-tighter">GT</span>
        </div>
        
        {/* Page title component handles its own visibility/styling for desktop */}
        <PageTitle />
      </div>

      {/* Right side global actions */}
      <div className="flex items-center gap-0 md:gap-3">
        <Search />
        <Notifications />
        <User />
      </div>
    </header>
  );
};

export default Header;