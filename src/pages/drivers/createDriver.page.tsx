import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';

export default function CreateMotorcyclePage() {
  const [form, setForm] = useState<Omit<Motorcycle, 'id'>>({
    license_plate: '',
    brand: '',
    year: new Date().getFullYear(),
    status: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'year' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async () => {
    if (!form.license_plate || !form.brand || !form.year || !form.status) {
      Swal.fire({ title: 'Error', text: 'Todos los campos son obligatorios.', icon: 'warning' });
      return;
    }

    const response = await motorcycleService.post_motorcycle(form);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({ title: 'Éxito', text: 'Motocicleta creada correctamente.', icon: 'success' });
      navigate('/motorcycles/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Error al crear la motocicleta.', icon: 'error' });
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-xl font-semibold mb-4">Crear Moto</h1>
      <input name="license_plate" placeholder="Placa" onChange={handleChange} className="input mb-2 w-full" />
      <input name="brand" placeholder="Marca" onChange={handleChange} className="input mb-2 w-full" />
      <input type="number" name="year" placeholder="Año" onChange={handleChange} className="input mb-2 w-full" />
      <input name="status" placeholder="Estado" onChange={handleChange} className="input mb-2 w-full" />
      <button className="btn w-full" onClick={handleSubmit}>Guardar</button>
    </div>
  );
}