import { useState } from 'react';
import Swal from 'sweetalert2';
import restaurantService from '../../services/restaurant.service';
import Restaurant from '../../models/Restaurant.model';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function CreateRestaurantPage() {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant>(new Restaurant());

  const validationSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
  
  address: Yup.string()
    .required('La dirección es obligatoria')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede superar los 100 caracteres'),
  
  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^\d{7,15}$/, 'El teléfono debe contener entre 7 y 15 dígitos numéricos'),
  
  email: Yup.string()
    .email('Email inválido')
    .required('El email es obligatorio')
    .max(50, 'El email no puede superar los 50 caracteres'),
  });

  const formik = useFormik({
    initialValues: {
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      email: restaurant.email,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Actualizamos el estado local restaurant con los valores validados
      setRestaurant(new Restaurant(values));
      const response = await restaurantService.post_restaurant(values);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({ title: 'Success', text: 'Restaurant created successfully', icon: 'success' });
        navigate('/restaurants/list');
      } else {
        Swal.fire({ title: 'Error', text: 'Failed to create restaurant', icon: 'error' });
      }
    },
    enableReinitialize: true,
  });

  // Para mantener sincronizado el estado restaurant con formik.values en caso de que cambien (opcional)
  // Si no quieres, puedes omitir este efecto.

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear Restaurante</h2>
      <form onSubmit={formik.handleSubmit}>
        {['name', 'address', 'phone', 'email'].map((field) => (
          <div key={field} className="mb-3">
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field}
              className={`w-full border px-3 py-2 rounded ${
                formik.touched[field] && formik.errors[field] ? 'border-red-500' : ''
              }`}
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="text-red-600 text-sm mt-1">{formik.errors[field]}</div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={formik.isSubmitting}
        >
          Crear
        </button>
      </form>
    </div>
  );
}
