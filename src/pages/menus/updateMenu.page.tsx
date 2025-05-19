// src/pages/menus/updateMenu.page.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import menuService from '../../services/menu.service';
import productService from '../../services/product.service';
import Menu from '../../models/Menu.model';

export default function UpdateMenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const resMenu = await menuService.get_by_id(Number(id));
      setMenu(resMenu.data);
      const resProducts = await productService.get_all();
      setProducts(resProducts.data || []);
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenu({ ...menu, [name]: type === 'checkbox' ? checked : value } as Menu);
  };

  const handleSubmit = async () => {
    const res = await menuService.update(Number(id), menu);
    if (res.status === 200) {
      navigate('/menus'); // o navegar al restaurante según lo necesites
    }
  };

  if (!menu) return <p>Cargando menú...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar menú</h2>

      <select
        name="product_id"
        value={menu.product_id}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <input
        name="price"
        type="number"
        value={menu.price}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        placeholder="Precio"
      />

      <label className="flex items-center space-x-2">
        <input
          name="availability"
          type="checkbox"
          checked={menu.availability}
          onChange={handleChange}
        />
        <span>Disponible</span>
      </label>

      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
}
