// src/pages/drivers/viewDriver.page.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import driverService from '../../services/driver.service';
import Driver from '../../models/Driver.model';

export default function ViewDriverPage() {
  const { id } = useParams();
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await driverService.get_data_by_id(Number(id));
      setDriver(res.data as Driver);
    };
    fetch();
  }, [id]);

  if (!driver) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-2 text-lg">
      <h2 className="font-bold text-xl text-center">Detalles del conductor</h2>
      <p><strong>Nombre:</strong> {driver.name}</p>
      <p><strong>Licencia:</strong> {driver.license_number}</p>
      <p><strong>Teléfono:</strong> {driver.phone}</p>
      <p><strong>Email:</strong> {driver.email}</p>
      <p><strong>Status:</strong> {driver.status}</p>
    </div>
  );
}