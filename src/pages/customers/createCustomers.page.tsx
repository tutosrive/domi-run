import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import customerService from '../../services/customer.service';

export default function CreateCustomersPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await customerService.post_customer(formData);
    if (res.status === 200 && res.data.id) {
      await customerService.send_customer_counter(res.data.id, 'POST');
      navigate('/customers/list');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Create new customer</h2>
      {['name', 'document_number', 'phone', 'email', 'address'].map((field) => (
        <input
          key={field}
          type="text"
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
