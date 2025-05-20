import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';
import { Ripple } from 'primereact/ripple';

export default function ViewMotorcyclePage() {
  const [moto, setMoto] = useState<Motorcycle | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await motorcycleService.get_data_by_id(Number(id));
      setMoto(res.data as Motorcycle);
    };
    fetch();
  }, [id]);

  if (!moto) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-6">Detalles de la Moto</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Placa</label>
          <input type="text" value={moto.license_plate} readOnly className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Marca</label>
          <input type="text" value={moto.brand} readOnly className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Año</label>
          <input type="text" value={moto.year.toString()} readOnly className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <input type="text" value={moto.status} readOnly className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-600" />
        </div>
        <div className="flex justify-between pt-4">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple px-4 py-2 bg-gray-600 rounded hover:bg-gray-400">
            Back
            <Ripple />
          </button>
          <button type="button" onClick={() => navigate(`/map/${moto.license_plate}`)} className="p-ripple blue-ripple px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Track Motorcycle
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
