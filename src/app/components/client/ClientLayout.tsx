import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { DataProvider } from '../../context/DataContext';
import { Home, Building2, ShoppingBag, LogOut } from 'lucide-react';

export function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || user.role !== 'client') {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/client/properties', label: 'Propiedades', icon: Building2 },
    { path: '/client/purchases', label: 'Mis Compras', icon: ShoppingBag },
  ];

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Home className="size-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Benja's y Raices</h1>
                <p className="text-sm text-gray-600">Tu hogar ideal te espera</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="size-4" />
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                    location.pathname === path
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </DataProvider>
  );
}
