import {
    getUserRouteToken,
    userPageNames as pageNames
} from "@app/routes/routes";
import { useLocation } from "react-router";

const defaultTitle = "Welcome";

const PageTitle = () => {
    const location = useLocation();
    const routeToken = getUserRouteToken(location.pathname);
    const pageName = routeToken !== null ? pageNames[routeToken] : defaultTitle;
    
    return (
        <div className="hidden md:block pl-6">
            <h1 className="text-2xl">
                {pageName}
            </h1>
        </div>
    )
}

export default PageTitle