import { useState } from 'react';
import restaurantService from '../../services/restaurant.service';
import Restaurant from '../../models/Restaurant.model';
import { useNavigate } from 'react-router-dom';

export default function CreateRestaurantPage() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await restaurantService.post_restaurant(restaurant);
    if (res.status === 200) {
      navigate('/restaurants/list');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear Restaurante</h2>
      {['name', 'address', 'phone', 'email'].map((field) => (
        <input
          key={field}
          type={field === 'email' ? 'email' : 'text'}
          name={field}
          value={(restaurant as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </div>
  );
}
