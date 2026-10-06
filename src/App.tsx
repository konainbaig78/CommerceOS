import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { Header } from "./components/layout/Header";
import { MobileNav } from "./components/layout/MobileNav";
import { Sidebar } from "./components/layout/Sidebar";

import AICopilot from "./pages/AICopilot";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Settings from "./pages/Settings";

import { useTheme } from "./hooks/useTheme";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f7f9f9] text-slate-900 transition-colors dark:bg-[#0B0F10] dark:text-white">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <Header
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
        />

        <main
          className={`min-h-screen pt-[72px] transition-all duration-300 ${
            collapsed
              ? "lg:pl-[76px]"
              : "lg:pl-[250px]"
          }`}
        >
          <div className="mx-auto max-w-[1600px] p-4 pb-24 sm:p-6 lg:p-8 lg:pb-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai" element={<AICopilot />} />
              <Route
                path="/settings"
                element={
                  <Settings
                    theme={theme}
                    setTheme={setTheme}
                  />
                }
              />
            </Routes>
          </div>
        </main>

        <MobileNav />
      </div>
    </BrowserRouter>
  );
}

export default App;