import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Header from "./components/ui/Header";   
import ScrollToTop from "@components/ScrollToTop";
import ErrorBoundary from "@components/ErrorBoundary";
import NotFound from "@pages/NotFound";
import HomeDashboard from "@pages/home-dashboard";
import MyLoans from "@pages/my-loans";
import Insights from "@pages/insights";
import Offers from "@pages/offers";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/home-dashboard" element={<HomeDashboard />} />
          <Route path="/my-loans" element={<MyLoans />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
