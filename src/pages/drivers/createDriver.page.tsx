import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import driverService from '../../services/driver.service';

export default function CreateDriverPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    license_number: '',
    phone: '',
    email: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async () => {
    const res = await driverService.post_driver(formData);
    console.log(res);

    if (res.status === 200 && res.data[0].id) {
      await driverService.send_driver_counter(res.data[0].id, { delta: 0 });
      navigate('/drivers/list');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo conductor</h2>
      {['name', 'license_number', 'phone', 'email', 'status'].map((field) => (
        <input key={field} type="text" name={field} value={(formData as any)[field]} onChange={handleChange} placeholder={field} className="w-full border px-3 py-2 rounded" />
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </div>
  );
}
