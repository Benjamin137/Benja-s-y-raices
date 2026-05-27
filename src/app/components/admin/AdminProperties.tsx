import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import type { Property } from '../../context/DataContext';

export function AdminProperties() {
  const { properties, addProperty, updateProperty, deleteProperty } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    images: [''],
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    squareMeters: 0,
    hasKitchen: true,
    kitchenType: '',
    price: 0,
    address: '',
    description: '',
  });

  const handleOpenModal = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        images: property.images,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        parking: property.parking,
        squareMeters: property.squareMeters,
        hasKitchen: property.hasKitchen,
        kitchenType: property.kitchenType || '',
        price: property.price,
        address: property.address,
        description: property.description,
      });
    } else {
      setEditingProperty(null);
      setFormData({
        images: [''],
        bedrooms: 0,
        bathrooms: 0,
        parking: 0,
        squareMeters: 0,
        hasKitchen: true,
        kitchenType: '',
        price: 0,
        address: '',
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
    };

    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
    } else {
      addProperty(propertyData);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta propiedad?')) {
      deleteProperty(id);
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Propiedades</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="size-5" />
          Nueva Propiedad
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={property.images[0]}
              alt={property.address}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{property.address}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-3 text-sm text-gray-700">
                <div>🛏️ {property.bedrooms} cuartos</div>
                <div>🚿 {property.bathrooms} baños</div>
                <div>🚗 {property.parking} parking</div>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <div>📐 {property.squareMeters} m²</div>
                {property.hasKitchen && <div>🍳 {property.kitchenType}</div>}
              </div>
              
              <div className="text-xl font-bold text-indigo-600 mb-3">
                ${property.price.toLocaleString()}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(property)}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Pencil className="size-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                >
                  <Trash2 className="size-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {editingProperty ? 'Editar Propiedad' : 'Nueva Propiedad'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="size-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes (URLs)
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="size-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <Plus className="size-4" />
                  Agregar imagen
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuartos
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Baños
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estacionamientos
                  </label>
                  <input
                    type="number"
                    value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Metros Cuadrados
                  </label>
                  <input
                    type="number"
                    value={formData.squareMeters}
                    onChange={(e) => setFormData({ ...formData, squareMeters: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    required
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hasKitchen}
                    onChange={(e) => setFormData({ ...formData, hasKitchen: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Tiene cocina</span>
                </label>
              </div>

              {formData.hasKitchen && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Cocina
                  </label>
                  <input
                    type="text"
                    value={formData.kitchenType}
                    onChange={(e) => setFormData({ ...formData, kitchenType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    placeholder="Ej: Moderna equipada, Cocina americana..."
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio (USD)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  {editingProperty ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
