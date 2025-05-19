import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import restaurantService from '../../services/restaurant.service';
import Restaurant from '../../models/Restaurant.model';

// Schema de validación
const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Minimo 3 caracteres').required('El nombre es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Solo números')
    .min(7, 'Mínimo 7 dígitos')
    .required('Teléfono requerido'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
});

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
      try {
        await validationSchema.validate(restaurant, { abortEarly: false });
        const res = await restaurantService.update_restaurant(restaurant.id, restaurant);
        if (res.status === 200) {
          navigate('/restaurants/list');
          Swal.fire({ title: 'Success', text: 'Customer updated successfully', icon: 'success' });
        } else {
          Swal.fire({ title: 'Error', text: 'Failed to update restaurant', icon: 'error' });
        }
      } catch (err: any) {
        if (err.inner) {
          const errors = err.inner.map((e: any) => e.message).join('<br>');
          Swal.fire({
            title: 'Errores de validación',
            html: errors,
            icon: 'error',
          });
        } else {
          Swal.fire('Error', 'Error desconocido de validación', 'error');
        }
      }
    }
  };

  if (!restaurant) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar Restaurante</h2>
      {['name', 'address', 'phone', 'email'].map((field) => (
        <input key={field} type="text" name={field} value={(restaurant as any)[field]} onChange={handleChange} placeholder={field} className="w-full border px-3 py-2 rounded" />
      ))}
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Guardar Cambios
      </button>
    </div>
  );
}
