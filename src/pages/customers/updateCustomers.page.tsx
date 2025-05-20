import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../services/customer.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ripple } from 'primereact/ripple';

export default function UpdateCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Validación Yup (sin cambios)
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Mínimo 3 caracteres').required('Nombre requerido'),
    email: Yup.string().email('Correo inválido').required('Correo requerido'),
    phone: Yup.string()
      .matches(/^\+?[0-9]{7,15}$/, 'Teléfono válido con + opcional y 7-15 dígitos')
      .required('Teléfono requerido'),
  });

  // Configuración de Formik sin enableReinitialize
  const formik = useFormik({
    initialValues: { id: '', name: '', email: '', phone: '' },
    validationSchema,
    onSubmit: async (values) => {
      const { id: valueId, ...customerData } = values;
      const res = await customerService.update_customer(Number(valueId), customerData);
      if (res.status === 200) {
        Swal.fire({ title: 'Éxito', text: 'Cliente actualizado', icon: 'success' });
        navigate(-1);
      } else {
        Swal.fire({ title: 'Error', text: 'Error al actualizar', icon: 'error' });
      }
    },
  });

  // Cargar datos y actualizar Formik
  useEffect(() => {
    async function fetchCustomer() {
      const res = await customerService.get_data_by_id(Number(id));
      const data = res.data;
      formik.setValues({
        id: data.id?.toString() || '',
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
      });
    }
    fetchCustomer();
  }, [id]);

  // Manejador personalizado para teléfono
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/(?!^\+)\D/g, ''); // Elimina todo excepto números y +
    if ((value.match(/\+/g) || []).length > 1) {
      value = '+' + value.replace(/\+/g, '');
    }
    formik.setFieldValue('phone', value);
  };

  // Mostrar carga inicial
  if (!formik.values.id) return <p>Cargando...</p>;

  // Campos del formulario
  const fields = [
    { key: 'id', label: 'ID', type: 'text', disabled: true },
    { key: 'name', label: 'Nombre', type: 'text' },
    { key: 'email', label: 'Correo', type: 'email' },
    { key: 'phone', label: 'Teléfono', type: 'text', placeholder: '+57 (XX) XXXXXXX' },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold text-center mb-6">Editar Cliente</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {fields.map(({ key, label, type, disabled, placeholder }) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium mb-1">
              {label}
            </label>
            <input
              id={key}
              name={key}
              type={type}
              disabled={disabled}
              placeholder={placeholder || label}
              value={formik.values[key]}
              onChange={key === 'phone' ? handlePhoneChange : formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border px-3 py-2 rounded ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            />
            {formik.touched[key] && formik.errors[key] && <div className="text-red-500 text-sm mt-1">{formik.errors[key]}</div>}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto">
            Volver
            <Ripple />
          </button>
          <button type="submit" className="p-ripple orange-ripple bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Actualizar
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
