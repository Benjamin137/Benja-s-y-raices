import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export function ClientPropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties, addPurchase } = useData();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h2>
        <Link to="/client/properties" className="text-indigo-600 hover:text-indigo-800">
          Volver a propiedades
        </Link>
      </div>
    );
  }

  const handlePurchase = () => {
    if (user) {
      addPurchase({
        propertyId: property.id,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
        totalPrice: property.price,
      });
      setShowConfirmation(true);
      setTimeout(() => {
        navigate('/client/purchases');
      }, 2000);
    }
  };

  return (
    <div>
      <Link
        to="/client/properties"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="size-5" />
        Volver a propiedades
      </Link>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Image Gallery */}
        <div className="relative">
          <img
            src={property.images[currentImageIndex]}
            alt={property.address}
            className="w-full h-96 object-cover"
          />
          {property.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.address}</h1>
              <p className="text-gray-600">{property.description}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-indigo-600">
                ${property.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">USD</div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-3xl mb-2">🛏️</div>
              <div className="font-semibold text-gray-800">{property.bedrooms}</div>
              <div className="text-sm text-gray-600">Cuartos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚿</div>
              <div className="font-semibold text-gray-800">{property.bathrooms}</div>
              <div className="text-sm text-gray-600">Baños</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚗</div>
              <div className="font-semibold text-gray-800">{property.parking}</div>
              <div className="text-sm text-gray-600">Estacionamientos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📐</div>
              <div className="font-semibold text-gray-800">{property.squareMeters} m²</div>
              <div className="text-sm text-gray-600">Superficie</div>
            </div>
          </div>

          {/* Kitchen Details */}
          {property.hasKitchen && (
            <div className="mb-8 p-6 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">🍳 Cocina</h3>
              <p className="text-gray-700">{property.kitchenType}</p>
            </div>
          )}

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="mb-8">
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Galería de Imágenes</h3>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-indigo-600'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.address} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purchase Button */}
          <div className="border-t border-gray-200 pt-6">
            {showConfirmation ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center">
                <div className="text-xl font-semibold mb-1">¡Solicitud de compra enviada!</div>
                <div className="text-sm">Redirigiendo a tus compras...</div>
              </div>
            ) : (
              <button
                onClick={handlePurchase}
                className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-lg transition-colors text-lg font-semibold"
              >
                <ShoppingCart className="size-6" />
                Comprar Propiedad
              </button>
            )}
            <p className="text-sm text-gray-500 text-center mt-3">
              Tu solicitud será revisada y validada por nuestro equipo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
