import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import shiftService from '../../services/shift.service';

export default function UpdateShiftPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    status: '',
  });

  useEffect(() => {
    (async () => {
      const res = await shiftService.get_by_id(Number(id));
      const shift = res.data;
      setFormData({
        start_time: new Date(shift.start_time).toISOString().slice(0, 16),
        end_time: new Date(shift.end_time).toISOString().slice(0, 16),
        status: shift.status,
      });
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await shiftService.update(Number(id), formData);
    if (res.status === 200) navigate('/shifts/list');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar turno</h2>
      <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full border p-2 rounded" />
      <input type="text" name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar cambios</button>
    </div>
  );
}
