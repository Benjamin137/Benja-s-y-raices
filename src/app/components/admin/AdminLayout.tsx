import { Outlet, Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { DataProvider } from '../../context/DataContext';
import { Home, Users, Building2, ShoppingCart, LogOut } from 'lucide-react';

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin/users', label: 'Usuarios', icon: Users },
    { path: '/admin/properties', label: 'Propiedades', icon: Building2 },
    { path: '/admin/sales', label: 'Validar Ventas', icon: ShoppingCart },
  ];

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-indigo-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Home className="size-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">Benja's y Raices</h1>
                <p className="text-sm text-indigo-200">Panel de Administración</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Hola, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="size-4" />
                Salir
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white shadow-md">
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
