import { NavLink } from "react-router";
import { userRoutes as routes, userPageNames, type UserRouteToken } from "@app/routes/routes";

const navigationItems = Object.entries(routes).map(([token, path]) => (
  { label: userPageNames[token as UserRouteToken], route: path }
))

const Navigation = () => {
  return (
    <aside className="hidden md:block bg-background p-4 border-border border-r min-w-62 h-full [grid-area:navigation]">
      <nav className="flex flex-col h-full">

        {/* Logos con soporte para temas */}
        <div className="relative mb-6 w-40 h-15">
          <img src="/logo-light.png" alt="GameTracker" className="dark:hidden girly:hidden absolute inset-0" />
          <img src="/logo-dark.png" alt="GameTracker" className="hidden dark:block absolute inset-0" />
          <img src="/logo-girly.png" alt="GameTracker" className="hidden girly:block absolute inset-0" />
        </div>

        {/* Lista de Navegación */}
        <div className="flex flex-col gap-2">
          {navigationItems.map((item) => (
            <NavigationItem key={item.label} route={item.route}>
              {item.label}
            </NavigationItem>
          ))}
        </div>
      </nav>
    </aside>
  );
};

const NavigationItem = ({ children, route }: { children: React.ReactNode; route: string }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) => `
        relative block py-2 pl-4 pr-2 rounded-lg font-medium transition-all duration-200
        hover:text-brand hover:bg-card
        
        before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 
        before:w-1 before:h-[70%] before:bg-brand before:rounded-full before:transition-transform before:duration-200

        ${isActive 
          ? 'text-brand bg-card before:scale-y-100' 
          : 'text-foreground before:scale-y-0'
        }
      `}
    >
      {children}
    </NavLink>
  );
};

export default Navigation;