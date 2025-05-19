import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/product.service';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
    };
    const res = await productService.post_product(payload as any);
    if (res.status === 200 && res.data.id) {
      navigate('/products/list');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Create new product</h2>
      {['name', 'description', 'price', 'category'].map((field) => (
        <input
          key={field}
          type={field === 'price' ? 'number' : 'text'}
          name={field}
          value={(formData as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Crear
      </button>
    </div>
  );
}
