import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/product.service';
import Product from '../../models/Product.model';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'appetizers', // valor por defecto
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const res = await productService.post_product(formData as Product);
    console.log('Respuesta del backend:', res);

    if ((res.status === 200 || res.status === 201) && res.data?.id) {
      console.log('Producto creado con éxito. Redirigiendo...');
      navigate('/products');
    } else {
      console.warn('No se creó el producto correctamente');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo producto</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full border px-3 py-2 rounded"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="appetizers">Appetizers</option>
        <option value="main-courses">Main Courses</option>
        <option value="desserts">Desserts</option>
        <option value="drinks">Drinks</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        Crear Producto
      </button>
    </div>
  );
}
