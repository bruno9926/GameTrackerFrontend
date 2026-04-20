export const userRoutes = {
  DASHBOARD: "/dashboard",
  GAMES: "/games",
  PLATFORMS: "/platforms",
  SETTINGS: "/settings"
} as const;


export const publicRoutes = {
  LOGIN: "/login",
  SIGNUP: "/signup"
} as const;


// utilities
export type UserRouteToken = keyof typeof userRoutes;
export type PublicRouteToken = keyof typeof publicRoutes;

export const userPageNames: Record<UserRouteToken, string> = {
    DASHBOARD: "Gaming Dashboard",
    GAMES: "Games",
    PLATFORMS: "Platforms",
    SETTINGS: "Settings"
};

// Reverse mapping: path -> token
const userRoutesReverse = Object.entries(userRoutes).reduce(
  (acc, [key, value]) => {
    acc[value] = key as UserRouteToken;
    return acc;
  },
  {} as Record<string, UserRouteToken>
);

// Function para obtener el token desde un path
export function getUserRouteToken(path: string): UserRouteToken | null {
  return userRoutesReverse[path] ?? null;
}

export const defaultRoute = userRoutes.DASHBOARD;
