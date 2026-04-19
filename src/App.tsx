import { BrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";
import AppRoutes from "./AppRoutes";

const App = () => (
  <AppShell>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppShell>
);

export default App;
