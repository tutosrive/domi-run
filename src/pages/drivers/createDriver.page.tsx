import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import driverService from '../../services/driver.service';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CreateDriverPage() {
  const navigate = useNavigate();

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

  const initialValues = {
    name: '',
    license_number: '',
    phone: '',
    email: '',
    status: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await driverService.post_driver(values);
    if (response.status === 200 || response.status === 201) {
      await driverService.send_driver_counter(response.data.id, { delta: 0 });
      Swal.fire({ title: 'Éxito', text: 'Conductor creado exitosamente', icon: 'success' });
      navigate('/drivers/list');
    } else {
      Swal.fire({ title: 'Error', text: 'No se pudo crear el conductor', icon: 'error' });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo conductor</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          {['name', 'license_number', 'phone', 'email', 'status'].map((field) => (
            <div key={field}>
              <Field
                type="text"
                name={field}
                placeholder={field}
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name={field}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Crear
          </button>
        </Form>
      </Formik>
    </div>
  );
}
