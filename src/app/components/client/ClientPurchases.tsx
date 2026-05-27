import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

export function ClientPurchases() {
  const { user } = useAuth();
  const { purchases, properties } = useData();

  const userPurchases = purchases.filter(p => p.userId === user?.id);

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="size-6 text-green-600" />;
      case 'rejected':
        return <XCircle className="size-6 text-red-600" />;
      default:
        return <Clock className="size-6 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'validated':
        return 'Validada';
      case 'rejected':
        return 'Rechazada';
      default:
        return 'En revisión';
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'validated':
        return '¡Tu compra ha sido aprobada! Nos pondremos en contacto contigo pronto.';
      case 'rejected':
        return 'Tu solicitud de compra fue rechazada. Contáctanos para más información.';
      default:
        return 'Tu solicitud está siendo revisada por nuestro equipo.';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Compras</h2>
        <p className="text-gray-600 mt-1">Revisa el estado de tus solicitudes de compra</p>
      </div>

      {userPurchases.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Clock className="size-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tienes compras registradas
          </h3>
          <p className="text-gray-600 mb-6">
            Explora nuestras propiedades disponibles y encuentra tu hogar ideal
          </p>
          <Link
            to="/client/properties"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ver Propiedades
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userPurchases.map((purchase) => {
            const property = getProperty(purchase.propertyId);
            return (
              <div key={purchase.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="mt-1">
                      {getStatusIcon(purchase.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {property?.address || 'Propiedad no disponible'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Fecha de solicitud: {new Date(purchase.date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(purchase.status)}`}>
                          {getStatusText(purchase.status)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {getStatusDescription(purchase.status)}
                      </p>

                      {property && (
                        <div className="flex gap-6 mb-4">
                          <img
                            src={property.images[0]}
                            alt={property.address}
                            className="w-32 h-24 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-2">
                              <div>🛏️ {property.bedrooms} cuartos</div>
                              <div>🚿 {property.bathrooms} baños</div>
                              <div>🚗 {property.parking} parking</div>
                              <div>📐 {property.squareMeters} m²</div>
                            </div>
                            {property.hasKitchen && (
                              <div className="text-sm text-gray-600">
                                🍳 {property.kitchenType}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="text-2xl font-bold text-indigo-600">
                          ${purchase.totalPrice.toLocaleString()}
                        </div>
                        {property && (
                          <Link
                            to={`/client/properties/${property.id}`}
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm"
                          >
                            <Eye className="size-4" />
                            Ver detalles
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
