import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventsProvider } from './hooks/useEvents';
import { SettingsProvider } from './hooks/useSettings';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import EventDetailPage from './pages/EventDetailPage';
import EventFormPage from './pages/EventFormPage';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <EventsProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground font-sans">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />
                <Route path="/create" element={<EventFormPage />} />
                <Route path="/edit/:id" element={<EventFormPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </EventsProvider>
    </SettingsProvider>
  );
};

export default App;
