import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
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
      name: Yup.string().min(3, 'Minimo 3 caracteres').required('Nombre requerido'),
      email: Yup.string().email('Correo inválido').required('Correo requerido'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Solo números')
        .min(7, 'Mínimo 7 dígitos')
        .required('Teléfono requerido'),
    });

  const handleSubmit = async (values: Customer) => {
    const { id, ...customerData } = values;
    const res = await customerService.update_customer(Number(id), customerData);
    if (res.status === 200) {
      Swal.fire({ title: 'Success', text: 'Customer updated successfully', icon: 'success' });
      navigate('/customers/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to update restaurant', icon: 'error' });
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
