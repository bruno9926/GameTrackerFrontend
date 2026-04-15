// routing
import AppRoutes from "./routes/AppRoutes";
// context
import Providers from "./Providers";
// initialization
import AppInitializer from "./AppInitializer";
// styles
import "./styles/main.scss";
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
