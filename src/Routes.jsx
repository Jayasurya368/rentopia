import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import PropertyDetails from "pages/property-details";
import RealTimeChatInterface from "pages/real-time-chat-interface";
import PropertySearchResults from "pages/property-search-results";
import OwnerDashboard from "pages/owner-dashboard";
import PropertyListingCreation from "pages/property-listing-creation";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<PropertySearchResults />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="/property-details" element={<PropertyDetails />} />
        <Route path="/real-time-chat-interface" element={<RealTimeChatInterface />} />
        <Route path="/property-search-results" element={<PropertySearchResults />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/property-listing-creation" element={<PropertyListingCreation />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;