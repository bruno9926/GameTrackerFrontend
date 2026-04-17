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

export const defaultRoute = userRoutes.DASHBOARD;
