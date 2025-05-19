// src/pages/drivers/updateDriver.page.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import driverService from '../../services/driver.service';
import Driver from '../../models/Driver.model';

export default function UpdateDriverPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await driverService.get_data_by_id(Number(id));
      setDriver(res.data as Driver);
    };
    fetch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (driver) setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (driver) {
      const res = await driverService.update_driver(driver.id, driver);
      if (res.status === 200) {
        await driverService.send_driver_counter(driver.id, 'PUT');
        navigate('/drivers/list');
      }
    }
  };

  if (!driver) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar conductor</h2>
      {['name', 'license_number', 'phone', 'email', 'status'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={(driver as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
}