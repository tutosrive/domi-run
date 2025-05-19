import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import customerService from '../../services/customer.service';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function CreateCustomersPage() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimo 3 caracteres').required('Nombre requerido'),
    email: Yup.string().email('Correo inválido').required('Correo requerido'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Solo números')
      .min(7, 'Mínimo 7 dígitos')
      .required('Teléfono requerido'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    const response = await customerService.post_customer(values);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({ title: 'Success', text: 'Customer created successfully', icon: 'success' });
      navigate('/customers/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to create customers', icon: 'error' });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Create new customer</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          {['name', 'phone', 'email'].map((field) => (
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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Crear
          </button>
        </Form>
      </Formik>
    </div>
  );
}
