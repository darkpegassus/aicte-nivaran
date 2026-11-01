import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InstitutionsPage from './pages/InstitutionsPage';
import InstitutionDetailPage from './pages/InstitutionDetailPage';
import ComplaintsPage from './pages/ComplaintsPage';
import OverlapDetectionPage from './pages/OverlapDetectionPage';
import CaseTrackingPage from './pages/CaseTrackingPage';
import ReportsPage from './pages/ReportsPage';
import BureauManagementPage from './pages/BureauManagementPage';
import UserManagementPage from './pages/UserManagementPage';
import SettingsPage from './pages/SettingsPage';

// Protected Route Shield
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Root Path Decider: If logged in -> /dashboard, if not -> /login
const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* Default Root Route: Always directs fresh visitors to /login */}
              <Route path="/" element={<RootRedirect />} />

              {/* Public Login Route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Authenticated Application Shell */}
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/institutions" element={<InstitutionsPage />} />
                <Route path="/institutions/:id" element={<InstitutionDetailPage />} />
                <Route path="/complaints" element={<ComplaintsPage />} />
                <Route path="/overlaps" element={<OverlapDetectionPage />} />
                <Route path="/case-tracking" element={<CaseTrackingPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/bureaus" element={<BureauManagementPage />} />
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<RootRedirect />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
};

export default App;