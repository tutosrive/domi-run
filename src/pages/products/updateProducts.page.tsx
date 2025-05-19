import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../../services/product.service';
import Product from '../../models/Product.model';

export default function UpdateProductPage() {
  const [form, setForm] = useState<Product>(new Product());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const res = await productService.get_data_by_id(Number(id));
      if (res.status === 200) {
        setForm(res.data as Product);
      } else {
        alert('Error al cargar el producto');
      }
    };
    fetch();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!id) return;
    const res = await productService.update_product(Number(id), form);
    if (res.status === 200) {
      Swal.fire({ title: 'Success', text: 'Customer updated successfully', icon: 'success' });
      navigate('/products/category/all');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to update restaurant', icon: 'error' });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4 p-4">
      <h2 className="text-xl font-bold text-center mb-4">Actualizar Producto</h2>

      <input
        type="text"
        name="name"
        value={form.name || ''}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="text"
        name="description"
        value={form.description || ''}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="number"
        name="price"
        value={form.price !== undefined ? form.price : ''}
        onChange={handleChange}
        placeholder="Precio"
        className="w-full border px-3 py-2 rounded"
      />

      <select
        name="category"
        value={form.category || 'appetizers'}
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
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Guardar
      </button>
    </div>
  );
}
