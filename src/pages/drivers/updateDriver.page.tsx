import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import driverService from '../../services/driver.service';
import Driver from '../../models/Driver.model';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UpdateDriverPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await driverService.get_data_by_id(Number(id));
      setDriver(res.data as Driver);
    };
    fetch();
  }, [id]);

  const validationSchema = Yup.object({
      name: Yup.string().min(3, 'Mínimo 3 caracteres').required('Nombre requerido'),
      license_number: Yup.string().matches(/^[0-9]+$/, 'Solo números').min(5, 'Mínimo 5 dígitos').required('Número de licencia requerido'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Solo números')
        .min(7, 'Mínimo 7 dígitos')
        .required('Teléfono requerido'),
      email: Yup.string().email('Correo inválido').required('Correo requerido'),
      status: Yup.string().required('Estado requerido'),
    });

  const formik = useFormik<Driver>({
    enableReinitialize: true,
    initialValues: driver || {
      id: 0,
      name: '',
      license_number: '',
      phone: '',
      email: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await driverService.update_driver(values.id, values);
      if (res.status === 200) {
        Swal.fire({ title: 'Success', text: 'Driver updated successfully', icon: 'success' });
        navigate('/drivers/list');
      } else {
        Swal.fire({ title: 'Error', text: 'Failed to update restaurant', icon: 'error' });
      }
    },
  });

  if (!driver) return <p>Cargando...</p>;

  const fields: (keyof Driver)[] = ['name', 'license_number', 'phone', 'email', 'status'];

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar conductor</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <input type="text" name={field} value={formik.values[field]} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={field} className="w-full border px-3 py-2 rounded" />
            {formik.touched[field] && formik.errors[field] && <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
