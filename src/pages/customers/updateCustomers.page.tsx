import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../services/customer.service';
import Customer from '../../models/Customer.model';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function UpdateCustomerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await customerService.get_data_by_id(Number(id));
      setCustomer(res.data as Customer);
    };
    fetch();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'Debe tener al menos 3 caracteres'),
    email: Yup.string()
      .email('Correo inválido')
      .required('El correo es obligatorio'),
    phone: Yup.string()
      .required('El teléfono es obligatorio')
      .matches(/^\d{10}$/, 'Debe tener exactamente 10 dígitos numéricos'),
  });

  const handleSubmit = async (values: Customer) => {
    const res = await customerService.post_customer(values);
    if (res.status === 200) {
      navigate('/customers/list');
    }
  };

  if (!customer) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar cliente</h2>
      <Formik
        initialValues={customer}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <Field
              name="name"
              type="text"
              placeholder="Nombre"
              className="w-full border px-3 py-2 rounded"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field
              name="email"
              type="email"
              placeholder="Correo"
              className="w-full border px-3 py-2 rounded"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field
              name="phone"
              type="text"
              placeholder="Teléfono"
              className="w-full border px-3 py-2 rounded"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Guardar cambios
          </button>
        </Form>
      </Formik>
    </div>
  );
}
