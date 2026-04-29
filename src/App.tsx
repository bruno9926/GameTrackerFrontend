// routing
import AppRoutes from "@routes/AppRoutes";
// context
import Providers from "./app/providers/Providers";
// initialization
import AppInitializer from "./app/AppInitializer";
// styles
import "./index.css";

function App() {
  return (
    <Providers>
      <AppInitializer>
        <AppRoutes />
      </AppInitializer>
    </Providers>
  );
}

export default App;
