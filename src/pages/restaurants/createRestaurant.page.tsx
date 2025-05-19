import { useState } from 'react';
import Swal from 'sweetalert2';
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
    const response = await restaurantService.post_restaurant(restaurant);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({ title: 'Success', text: 'Restaurant created successfully', icon: 'success' });
      navigate('/restaurants/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to create restaurant', icon: 'error' });
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
