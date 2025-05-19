// src/pages/menus/createMenu.page.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import menuService from '../../services/menu.service';
import Menu from '../../models/Menu.model';
import productService from '../../services/product.service';

export default function CreateMenuPage() {
  const { id } = useParams(); // id del restaurante
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState<Omit<Menu, 'id'>>({
    price: 0,
    availability: true,
    product_id: -1,
    restaurant_id: Number(id),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productService.get_all();
      setProducts(res.data || []);
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const res = await menuService.create(formData);
    if (res.status === 200) {
      navigate(`/restaurants/view/${id}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear menú para restaurante {id}</h2>
      <select
        name="product_id"
        value={formData.product_id}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value={-1}>Selecciona un producto</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <input
        name="price"
        type="number"
        placeholder="Precio"
        value={formData.price}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <label className="flex items-center space-x-2">
        <input
          name="availability"
          type="checkbox"
          checked={formData.availability}
          onChange={handleChange}
        />
        <span>Disponible</span>
      </label>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </div>
  );
}
