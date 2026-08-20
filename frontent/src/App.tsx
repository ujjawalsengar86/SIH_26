import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NewLcaPage } from './pages/NewLcaPage';
import { LcaAnalysisPage } from './pages/LcaAnalysisPage';
import { ScenarioComparisonPage } from './pages/ScenarioComparisonPage';
import { AiSimulatorPage } from './pages/AiSimulatorPage';
import { CircularityPage } from './pages/CircularityPage';
import { MaterialPassportPage } from './pages/MaterialPassportPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { DataQualityPage } from './pages/DataQualityPage';
import { AssumptionsPage } from './pages/AssumptionsPage';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <ProjectProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Authentication & Presentation Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Authenticated Workspace App Layout Routes */}
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/new-lca" element={<NewLcaPage />} />
                  <Route path="/analysis" element={<LcaAnalysisPage />} />
                  <Route path="/scenarios" element={<ScenarioComparisonPage />} />
                  <Route path="/ai-simulator" element={<AiSimulatorPage />} />
                  <Route path="/circularity" element={<CircularityPage />} />
                  <Route path="/material-passport" element={<MaterialPassportPage />} />
                  <Route path="/recommendations" element={<RecommendationsPage />} />
                  <Route path="/data-quality" element={<DataQualityPage />} />
                  <Route path="/assumptions" element={<AssumptionsPage />} />
                  <Route path="/audit-trail" element={<AuditTrailPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>

                {/* Fallback Catch-All */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </ProjectProvider>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
