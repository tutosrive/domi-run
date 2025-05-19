import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';

export default function ViewMotorcyclePage() {
  const [moto, setMoto] = useState<Motorcycle | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const res = await motorcycleService.get_data_by_id(Number(id));
      setMoto(res.data as Motorcycle);
    };
    fetch();
  }, [id]);

  if (!moto) return <div className="text-center mt-10">Cargando...</div>;

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-xl font-bold mb-4">Detalles de la Moto</h1>
      <p><strong>Placa:</strong> {moto.license_plate}</p>
      <p><strong>Marca:</strong> {moto.brand}</p>
      <p><strong>Año:</strong> {moto.year}</p>
      <p><strong>Estado:</strong> {moto.status}</p>
    </div>
  );
}
