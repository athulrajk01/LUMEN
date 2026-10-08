import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { OverviewPage } from "./pages/OverviewPage";
import { EnergyDataPage } from "./pages/EnergyDataPage";
import { AnomaliesPage } from "./pages/AnomaliesPage";
import { ForecastingPage } from "./pages/ForecastingPage";
import { OptimizationPage } from "./pages/OptimizationPage";
import { SimulatorPage } from "./pages/SimulatorPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { navigationFlat } from "./config/navigation";

const realPages: Record<string, React.ReactNode> = {
  "/": <OverviewPage />,
  "/energy-data": <EnergyDataPage />,
  "/anomalies": <AnomaliesPage />,
  "/forecasting": <ForecastingPage />,
  "/optimization": <OptimizationPage />,
  "/simulator": <SimulatorPage />,
};

const placeholderRoutes = navigationFlat
  .filter((item) => !(item.path in realPages))
  .map((item) => ({
    path: item.path,
    element: (
      <PlaceholderPage
        title={item.label}
        description={`The ${item.label} section will let you ${getDescription(
          item.path
        )}.`}
      />
    ),
  }));

function getDescription(path: string): string {
  const descriptions: Record<string, string> = {
    "/consumption": "analyze historical consumption patterns",
    "/analytics": "compare periods, buildings, and categories",
    "/data-quality": "track completeness, duplicates, and invalid values",
    "/recommendations": "review AI-generated cost and carbon savings actions",
    "/scenarios": "create, save, and compare planning scenarios",
    "/goals": "set and track energy, cost, and carbon targets",
    "/cost": "manage tariffs and analyze your electricity spend",
    "/carbon": "track emissions, intensity, and avoided carbon",
    "/assets": "manage loads, assets, and their flexibility",
    "/schedules": "define operating hours and load scheduling windows",
    "/alerts": "configure thresholds and receive notifications",
    "/reports": "generate PDF, Excel, and CSV reports",
    "/audit": "review every action taken across the platform",
    "/settings": "manage users, buildings, tariffs, and preferences",
  };
  return descriptions[path] || "manage this part of LUMEN";
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "energy-data", element: <EnergyDataPage /> },
      { path: "anomalies", element: <AnomaliesPage /> },
      { path: "forecasting", element: <ForecastingPage /> },
      { path: "optimization", element: <OptimizationPage /> },
      { path: "simulator", element: <SimulatorPage /> },
      ...placeholderRoutes,
    ],
  },
]);