import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';

export default function UpdateMotorcyclePage() {
  const [form, setForm] = useState<Motorcycle>(new Motorcycle());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await motorcycleService.get_data_by_id(Number(id));
      setForm(res.data as Motorcycle);
    };
    fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await motorcycleService.update_motorcycle(Number(id), form);
    if (res.status === 200) {
      alert('Moto actualizada');
      navigate('/motorcycles/list');
    } else {
      alert('Error al actualizar');
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-xl font-semibold mb-4">Actualizar Moto</h1>
      <input name="license_plate" value={form.license_plate} onChange={handleChange} className="input mb-2" />
      <input name="brand" value={form.brand} onChange={handleChange} className="input mb-2" />
      <input name="year" value={form.year} onChange={handleChange} className="input mb-2" />
      <input name="status" value={form.status} onChange={handleChange} className="input mb-2" />
      <button className="btn" onClick={handleSubmit}>Guardar</button>
    </div>
  );
}
