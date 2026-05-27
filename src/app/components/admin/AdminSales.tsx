import { useData } from '../../context/DataContext';
import { Check, X, Clock } from 'lucide-react';

export function AdminSales() {
  const { purchases, updatePurchaseStatus, properties } = useData();

  const getProperty = (propertyId: string) => {
    return properties.find(p => p.id === propertyId);
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
        return 'Pendiente';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Validación de Ventas</h2>
        <p className="text-gray-600 mt-1">Gestiona las solicitudes de compra de propiedades</p>
      </div>

      <div className="space-y-4">
        {purchases.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No hay compras registradas
          </div>
        ) : (
          purchases.map((purchase) => {
            const property = getProperty(purchase.propertyId);
            return (
              <div key={purchase.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      {property && (
                        <img
                          src={property.images[0]}
                          alt={property.address}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-1">
                          {property?.address || 'Propiedad no encontrada'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Cliente: {purchase.userName}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Email: {purchase.userEmail}
                        </p>
                        <p className="text-sm text-gray-600">
                          Fecha: {new Date(purchase.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600 mb-2">
                        ${purchase.totalPrice.toLocaleString()}
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(purchase.status)}`}>
                        {getStatusText(purchase.status)}
                      </span>
                    </div>
                  </div>

                  {property && (
                    <div className="grid grid-cols-4 gap-4 mb-4 py-4 border-t border-gray-200 text-sm text-gray-600">
                      <div>🛏️ {property.bedrooms} cuartos</div>
                      <div>🚿 {property.bathrooms} baños</div>
                      <div>🚗 {property.parking} parking</div>
                      <div>📐 {property.squareMeters} m²</div>
                    </div>
                  )}

                  {purchase.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => updatePurchaseStatus(purchase.id, 'validated')}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Check className="size-5" />
                        Validar Compra
                      </button>
                      <button
                        onClick={() => updatePurchaseStatus(purchase.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <X className="size-5" />
                        Rechazar Compra
                      </button>
                    </div>
                  )}

                  {purchase.status !== 'pending' && (
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => updatePurchaseStatus(purchase.id, 'pending')}
                        className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Clock className="size-5" />
                        Regresar a Pendiente
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
