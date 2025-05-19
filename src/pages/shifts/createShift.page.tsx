import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import shiftService from '../../services/shift.service';
import driverService from '../../services/driver.service';
import motorcycleService from '../../services/motorcycle.service';

export default function CreateShiftPage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [motorcycles, setMotorcycles] = useState([]);
  const [formData, setFormData] = useState({
    driver_id: '',
    motorcycle_id: '',
    start_time: '',
    end_time: '',
    status: '',
  });

  useEffect(() => {
    (async () => {
      const d = await driverService.get_all_driver();
      setDrivers(d.data || []);
      const m = await motorcycleService.get_all_motorcycle();
      setMotorcycles(m.data || []);
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  const payload = {
    driver_id: Number(formData.driver_id),
    motorcycle_id: Number(formData.motorcycle_id),
    start_time: new Date(formData.start_time),
    end_time: new Date(formData.end_time),
    status: formData.status,
  };

  const res = await shiftService.create(payload);
  if (res.status === 200 || res.status === 201) {
    Swal.fire({ title: 'Success', text: 'Shift created successfully', icon: 'success' });
    navigate('/shifts/list');
  } else {
    Swal.fire({ title: 'Error', text: 'Failed to create shift', icon: 'error' });
  }
};


  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo turno</h2>
      <select name="driver_id" value={formData.driver_id} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">Selecciona conductor</option>
        {drivers.map((d: any) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
      <select name="motorcycle_id" value={formData.motorcycle_id} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="">Selecciona motocicleta</option>
        {motorcycles.map((m: any) => (
          <option key={m.id} value={m.id}>{m.license_plate}</option>
        ))}
      </select>
      <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Estado" className="w-full border p-2 rounded" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
    </div>
  );
}
