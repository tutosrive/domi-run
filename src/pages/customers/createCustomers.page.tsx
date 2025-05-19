import { useState } from 'react';
import Swal from 'sweetalert2';
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
    const response = await customerService.post_customer(formData);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({ title: 'Success', text: 'Customer created successfully', icon: 'success' });
      navigate('/customers/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to create customers', icon: 'error' });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Create new customer</h2>
      {['name', 'phone', 'email'].map((field) => (
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
