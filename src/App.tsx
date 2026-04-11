// routing
import AppRoutes from "./routes/AppRoutes";
// context
import Providers from "./Providers";
// styles
import "./styles/main.scss";
import "./index.css";

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
