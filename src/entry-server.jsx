import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppShell from "./AppShell";
import AppRoutes from "./AppRoutes";

export function render(url) {
  return renderToString(
    <AppShell>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppShell>
  );
}
