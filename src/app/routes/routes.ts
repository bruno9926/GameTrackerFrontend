export const userRoutes = {
  DASHBOARD: "/dashboard",
  GAMES: "/games",
  FRIENDS: "/friends",
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
    FRIENDS: "Friends",
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
  console.log("Getting route token for path:", path);
  let mainPath = path.match(/^\/[a-zA-Z0-9_-]+/)?.[0];
  return mainPath ? userRoutesReverse[mainPath] : null;
}

export const defaultRoute = userRoutes.DASHBOARD;
