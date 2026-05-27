import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router';
import { Search, SlidersHorizontal } from 'lucide-react';

export function ClientProperties() {
  const { properties } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    minBathrooms: '',
    hasKitchen: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMinPrice = !filters.minPrice || property.price >= parseInt(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= parseInt(filters.maxPrice);
    const matchesMinBedrooms = !filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms);
    const matchesMinBathrooms = !filters.minBathrooms || property.bathrooms >= parseInt(filters.minBathrooms);
    const matchesKitchen = !filters.hasKitchen || property.hasKitchen;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && 
           matchesMinBedrooms && matchesMinBathrooms && matchesKitchen;
  });

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      minBathrooms: '',
      hasKitchen: false,
    });
    setSearchTerm('');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Propiedades Disponibles</h2>
        
        {/* Search Bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por ubicación o descripción..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              showFilters
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="size-5" />
            Filtros
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio Mínimo
                </label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  placeholder="$0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio Máximo
                </label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  placeholder="$999999"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mín. Cuartos
                </label>
                <input
                  type="number"
                  value={filters.minBedrooms}
                  onChange={(e) => setFilters({ ...filters, minBedrooms: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mín. Baños
                </label>
                <input
                  type="number"
                  value={filters.minBathrooms}
                  onChange={(e) => setFilters({ ...filters, minBathrooms: e.target.value })}
                  placeholder="0"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasKitchen}
                    onChange={(e) => setFilters({ ...filters, hasKitchen: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Con cocina</span>
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 text-sm text-gray-600">
        {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No se encontraron propiedades que coincidan con tu búsqueda
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              to={`/client/properties/${property.id}`}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={property.images[0]}
                alt={property.address}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{property.address}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-700">
                  <div>🛏️ {property.bedrooms}</div>
                  <div>🚿 {property.bathrooms}</div>
                  <div>🚗 {property.parking}</div>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <div>📐 {property.squareMeters} m²</div>
                  {property.hasKitchen && <div>🍳 {property.kitchenType}</div>}
                </div>
                
                <div className="text-xl font-bold text-indigo-600">
                  ${property.price.toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
