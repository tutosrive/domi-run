import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import shiftService from '../../services/shift.service';

export default function ViewShiftPage() {
  const { id } = useParams();
  const [shift, setShift] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await shiftService.get_by_id(Number(id));
      setShift(res.data);
    })();
  }, [id]);

  if (!shift) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-2">
      <h2 className="text-xl font-bold text-center">Detalles del Turno</h2>
      <p><strong>Conductor ID:</strong> {shift.driver_id}</p>
      <p><strong>Moto ID:</strong> {shift.motorcycle_id}</p>
      <p><strong>Inicio:</strong> {new Date(shift.start_time).toLocaleString()}</p>
      <p><strong>Fin:</strong> {new Date(shift.end_time).toLocaleString()}</p>
      <p><strong>Estado:</strong> {shift.status}</p>
    </div>
  );
}
