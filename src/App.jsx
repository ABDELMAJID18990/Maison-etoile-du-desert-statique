import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./animations";

// Import de tes composants
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import HomePage from "./pages/HomePage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import ContactPage from "./pages/ContactPage";
import WhatsAppButton from "./components/shared/WhatsAppButton";



function AnimatedRoutes() {
  const location = useLocation();

  return (
    
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
       
        <Route
          path="/chambres/:id"
          element={
            <PageTransition>
              <RoomDetailsPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

