import { userRoutes as routes } from "@app/routes/routes";
import { useLocation } from "react-router";

type routePaths = (typeof routes)[keyof typeof routes];
const pageNames: Record<routePaths, string> = {
    "/dashboard": "Gaming Dashboard",
    "/games": "Games",
    "/platforms": "Platforms",
    "/settings": "Settings"
}

const PageTitle = () => {
    const location = useLocation();
    const pageName = pageNames[location.pathname as routePaths] ?? "Welcome"
    return (
        <div className="hidden md:block pl-6">
            <h1 className="font-bold text-body text-xl">
                {pageName}
            </h1>
        </div>
    )
}

export default PageTitle