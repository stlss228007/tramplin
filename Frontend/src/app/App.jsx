import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, ApplicantPage, EmployerPage, CuratorPage, NotificationsPage, AuthPage } from '@/pages';
import { FavoritesProvider } from '@/features/favorites';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children, requiredRole }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1e2b] flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    if (currentUser.role === 'applicant') {
      return <Navigate to="/profile/applicant" replace />;
    } else if (currentUser.role === 'employer') {
      return <Navigate to="/profile/employer" replace />;
    } else if (currentUser.role === 'curator') {
      return <Navigate to="/profile/curator" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1e2b] flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (currentUser) {
    if (currentUser.role === 'applicant') {
      return <Navigate to="/profile/applicant" replace />;
    } else if (currentUser.role === 'employer') {
      return <Navigate to="/profile/employer" replace />;
    } else if (currentUser.role === 'curator') {
      return <Navigate to="/profile/curator" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/applicant"
            element={
              <PrivateRoute requiredRole="applicant">
                <ApplicantPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/employer"
            element={
              <PrivateRoute requiredRole="employer">
                <EmployerPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/curator"
            element={
              <PrivateRoute requiredRole="curator">
                <CuratorPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;