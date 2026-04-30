import { NavLink } from 'react-router';
// Iconos
import { HiHome } from "react-icons/hi2";
import { RiGamepadLine, RiGroupLine, RiSettings4Line } from "react-icons/ri";
// Tus rutas centralizadas
import { userRoutes } from '@app/routes/routes';

const BottomBar = () => {
  const navItems = [
    { 
      label: 'Home', 
      path: userRoutes.DASHBOARD, 
      icon: <HiHome size={22} /> 
    },
    {
      label: 'Games',
      path: userRoutes.GAMES,
      icon: <RiGamepadLine size={22} />
    },
    {
      label: 'Friends',
      path: userRoutes.FRIENDS,
      icon: <RiGroupLine size={22} />
    },
    {
      label: 'Settings',
      path: userRoutes.SETTINGS,
      icon: <RiSettings4Line size={22} />
    },
  ];

  return (
    <nav className="md:hidden right-0 bottom-0 left-0 z-50 fixed">
      <div className="flex justify-around items-center bg-card/98 backdrop-blur-sm px-4 py-2.5 border-border/50 border-t">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 transition-colors duration-200
              ${isActive ? 'text-brand' : 'text-subtitle/60 hover:text-subtitle'}
            `}
          >
            {item.icon}
            <span className="font-medium text-[12px]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
      
      {/* Soporte para áreas seguras (Home Indicator) */}
      <div className="h-[env(safe-area-inset-bottom)] bg-card/98" />
    </nav>
  );
};

export default BottomBar;