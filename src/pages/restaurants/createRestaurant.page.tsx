import { useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import restaurantService from '../../services/restaurant.service';
import Restaurant from '../../models/Restaurant.model';
import { useNavigate } from 'react-router-dom';

// Validaciones con Yup
const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Minimo 3 caracteres').required('El nombre es obligatorio'),
  address: Yup.string().required('La dirección es obligatoria'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Solo números')
    .min(7, 'Mínimo 7 dígitos')
    .required('Teléfono requerido'),
  email: Yup.string().email('Email inválido').required('El email es obligatorio'),
});

export default function CreateRestaurantPage() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' })); // limpiar error del campo
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(restaurant, { abortEarly: false });
      setErrors({}); // limpiar errores si todo está bien

      const response = await restaurantService.post_restaurant(restaurant);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: 'Éxito',
          text: 'Restaurante creado correctamente',
          icon: 'success',
        });
        navigate('/restaurants/list');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el restaurante',
          icon: 'error',
        });
      }
    } catch (err: any) {
      if (err.inner) {
        const fieldErrors: { [key: string]: string } = {};
        err.inner.forEach((e: any) => {
          if (!fieldErrors[e.path]) {
            fieldErrors[e.path] = e.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error desconocido de validación',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear Restaurante</h2>
      {['name', 'address', 'phone', 'email'].map((field) => (
        <div key={field} className="mb-4">
          <input
            type={field === 'email' ? 'email' : 'text'}
            name={field}
            value={(restaurant as any)[field]}
            onChange={handleChange}
            placeholder={field}
            className={`w-full border px-3 py-2 rounded ${
              errors[field] ? 'border-red-500' : ''
            }`}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Crear
      </button>
    </div>
  );
}
