import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantService from '../../services/restaurant.service';
import Restaurant from '../../models/Restaurant.model';

export default function UpdateRestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await restaurantService.get_data_by_id(Number(id));
      setRestaurant(res.data as Restaurant);
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (restaurant) {
      setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (restaurant) {
      const res = await restaurantService.update_restaurant(restaurant.id, restaurant);
      if (res.status === 200) navigate('/restaurants/list');
    }
  };

  if (!restaurant) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar Restaurante</h2>
      {['name', 'address', 'phone'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={(restaurant as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </div>
  );
}
