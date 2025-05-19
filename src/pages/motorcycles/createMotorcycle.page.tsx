import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';

export default function CreateMotorcyclePage() {
  const [form, setForm] = useState<Motorcycle>(new Motorcycle());
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await motorcycleService.post_motorcycle(form);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({ title: 'Success', text: 'Motorcycle created successfully', icon: 'success' });
      navigate('/motorcycles/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to create motorcycle', icon: 'error' });
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-xl font-semibold mb-4">Crear Moto</h1>
      <input name="license_plate" placeholder="Placa" onChange={handleChange} className="input mb-2" />
      <input name="brand" placeholder="Marca" onChange={handleChange} className="input mb-2" />
      <input name="year" placeholder="Año" onChange={handleChange} className="input mb-2" />
      <input name="status" placeholder="Estado" onChange={handleChange} className="input mb-2" />
      <button className="btn" onClick={handleSubmit}>Guardar</button>
    </div>
  );
}
