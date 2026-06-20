import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReferralDetails from './pages/ReferralDetails';
import NotFound from './pages/NotFound';

/**
 * Layout wrapper for authenticated pages, ensuring they have the Navbar and Footer.
 */
const ProtectedLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-white">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

/**
 * Main application component configuring routes and state.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Public Routes for Authentication (Redirects to dashboard if already authenticated) */}
        <Route element={<ProtectedRoute redirectIfAuthenticated={true} />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/referral/:id" element={<ReferralDetails />} />
          </Route>
        </Route>

        {/* 404 Route (Must NOT be wrapped in ProtectedRoute) */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
