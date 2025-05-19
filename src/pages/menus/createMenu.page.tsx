// src/pages/menus/createMenu.page.tsx
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import menuService from '../../services/menu.service';
import productService from '../../services/product.service';
import Menu from '../../models/Menu.model';
import Product from '../../models/Product.model';

export default function CreateMenuPage() {
  const { id } = useParams(); // restaurante_id
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [createNewProduct, setCreateNewProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'appetizers',
    description: '',
    price: 0,
  });

  const [formData, setFormData] = useState<Omit<Menu, 'id'>>({
    price: 0,
    availability: true,
    product_id: -1,
    restaurant_id: Number(id),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productService.get_all_product();
      setProducts(res.data || []);
    };
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleProductChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async () => {

    const res = await menuService.create(formData);
    if (res.status === 200 || res.status === 201) {
      Swal.fire({ title: 'Success', text: 'Menu created successfully', icon: 'success' });
      navigate(`/restaurants/view/${id}`);
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to create menu', icon: 'error' });

    let productId = formData.product_id;

    if (createNewProduct) {
      const res = await productService.create_product(newProduct);
      if (res.status === 200) {
        productId = res.data.id;
      } else {
        alert('Error al crear producto');
        return;
      }
    }

    const menuPayload = { ...formData, product_id: productId };
    const resMenu = await menuService.create(menuPayload);
    if (resMenu.status === 200) {
      navigate(`/restaurants/view/${id}`);
    } else {
      alert('Error al crear menú');

    }
  };

  return (
     <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear Menú</h2>

      {!createNewProduct && (
        <select
          name="product_id"
          value={formData.product_id}
          onChange={handleChange}
          className="w-full border p-2 rounded">
        
          <option value={-1}>Selecciona un producto existente</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={createNewProduct}
          onChange={() => setCreateNewProduct(!createNewProduct)}
        />
        <span className="text-">Crear nuevo producto</span>
      </div>

      {createNewProduct && (
        <>
          <input
            name="name"
            type="text"
            placeholder="Nombre del producto"
            value={newProduct.name}
            onChange={handleProductChange}
            className="w-full border px-3 py-2 rounded text-white"
          />
          <input
            name="description"
            type="text"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={handleProductChange}
            className="w-full border px-3 py-2 rounded text-white"
          />
          <input
            name="price"
            type="number"
            placeholder="Precio"
            value={isNaN(newProduct.price) ? '' : newProduct.price}
            onChange={handleProductChange}
            className="w-full border px-3 py-2 rounded text-white"
          />
          <select
          name="category"
          value={newProduct.category}
          onChange={handleProductChange}
          className="w-full border px-3 py-2 rounded"
          style={{ color: 'white' }}
        >
          <option value="appetizers">Appetizers</option>
          <option value="main-courses">Main Courses</option>
          <option value="desserts">Desserts</option>
          <option value="drinks">Drinks</option>
        </select>
        </>
      )}

      <input
        name="price"
        type="number"
        placeholder="Precio del menú"
        value={isNaN(formData.price) ? '' : formData.price}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded text-white"
      />

      <label className="flex items-center space-x-2 text-white">
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
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Crear
      </button>
    </div>
  );
}
