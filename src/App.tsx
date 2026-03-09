// routing
import AppRoutes from "./routes/AppRoutes";
// context
import Providers from "./Providers";
// styles
import "./styles/main.scss";

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
}

export default App;
