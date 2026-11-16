import { useEffect, useState } from 'react';
import { AppShell } from './components/AppShell';
import { SettingsModal } from './components/SettingsModal';
import { ASSETS, INITIAL_ALERTS_TABLE } from './data/imariData';
import { AlertsPage } from './pages/AlertsPage';
import { AuthPage } from './pages/AuthPage';
import { CompostPage } from './pages/CompostPage';
import { ConveyorPage } from './pages/ConveyorPage';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { MonitorPage } from './pages/MonitorPage';
import { ReportsPage } from './pages/ReportsPage';
import { AlertRecord, AppRoute, UserProfile } from './types';

const VALID_ROUTES: AppRoute[] = [
  'landing',
  'login',
  'signup',
  'dashboard',
  'conveyor',
  'compost',
  'monitor',
  'reports',
  'alerts',
];

const DEFAULT_USER: UserProfile = {
  name: 'Amina Uwase',
  email: 'amina.uwase@imari.rw',
  role: 'Facility Operations Lead',
  facility: 'Kigali Central Composting Hub',
  avatarUrl: ASSETS.userAvatar,
};

function readRouteFromHash(): AppRoute {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as AppRoute;
  return VALID_ROUTES.includes(hash) ? hash : 'landing';
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => readRouteFromHash());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('imari_demo_auth') === 'true';
  });
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('imari_demo_user');
    if (saved) {
      try {
        return { ...DEFAULT_USER, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });
  const [alerts, setAlerts] = useState<AlertRecord[]>(INITIAL_ALERTS_TABLE);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(readRouteFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextRoute: AppRoute) => {
    setRoute(nextRoute);
    window.location.hash = nextRoute === 'landing' ? '' : `#/${nextRoute}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = (name: string, email: string) => {
    const nextUser = { ...user, name, email };
    setUser(nextUser);
    setIsAuthenticated(true);
    localStorage.setItem('imari_demo_auth', 'true');
    localStorage.setItem('imari_demo_user', JSON.stringify(nextUser));
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('imari_demo_auth');
    navigate('login');
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setUser(updated);
    localStorage.setItem('imari_demo_user', JSON.stringify(updated));
  };

  const handleToggleAlertStatus = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Active' ? 'Resolved' : 'Active' } : a
      )
    );
  };

  const activeAlertCount = alerts.filter((a) => a.status === 'Active').length;

  if (route === 'landing') {
    return <LandingPage onNavigate={navigate} isAuthenticated={isAuthenticated} />;
  }

  if (route === 'login' || route === 'signup') {
    return (
      <AuthPage
        mode={route}
        onSwitchMode={(m) => navigate(m)}
        onSuccessAuth={handleAuthSuccess}
        onNavigate={navigate}
      />
    );
  }

  return (
    <>
      <AppShell
        currentRoute={route}
        onNavigate={navigate}
        user={user}
        onLogout={handleLogout}
        onOpenSettings={() => setSettingsOpen(true)}
        activeAlertCount={activeAlertCount}
      >
        {route === 'dashboard' && <DashboardPage onNavigate={navigate} />}
        {route === 'conveyor' && <ConveyorPage onNavigate={navigate} />}
        {route === 'compost' && <CompostPage onNavigate={navigate} />}
        {route === 'monitor' && <MonitorPage onNavigate={navigate} />}
        {route === 'reports' && <ReportsPage onNavigate={navigate} />}
        {route === 'alerts' && (
          <AlertsPage
            alerts={alerts}
            onToggleAlertStatus={handleToggleAlertStatus}
            onNavigate={navigate}
          />
        )}
      </AppShell>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />
    </>
  );
}
