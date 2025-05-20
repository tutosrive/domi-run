import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import customerService from '../../services/customer.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ripple } from 'primereact/ripple';

export default function CreateCustomersPage() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };

  // State to keep form values reactive
  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minium 3 chars').required('Required User Name'),
    email: Yup.string().email('Invalid email').required('Required Email'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Only numbers')
      .min(7, 'Minimum 7 digits')
      .max(15, 'Maximum 15 digits')
      .required('Required Phone'),
  });

  // Function to handle form submission
  const handleSubmit = async (values) => {
    const response = await customerService.post_customer(values);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({ title: 'Success', text: 'Customer created successfully', icon: 'success' });
      navigate('/customers/list');
    } else {
      Swal.fire({ title: 'Error', text: 'Failed to create customer', icon: 'error' });
    }
  };

  // Formik setup
  // Using enableReinitialize to reset form values when initialValues change
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setFormValues(values);
      handleSubmit(values);
    },
  });

  // Custom change & blur handler for formatting
  const handleChange = (e) => {
    let { name, value } = e.target;
    // Strip non-digits for phone
    if (name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  const handleBlur = (e) => {
    let { name, value } = e.target;
    // Trim and additional formatting
    if (name === 'name') {
      value = value.trim();
    }
    if (name === 'email') {
      value = value.trim().toLowerCase();
    }
    if (name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
    formik.handleBlur(e);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold text-center mb-6">Create new customer</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {['name', 'phone', 'email'].map((field: string) => {
          const typeMap = { name: 'text', phone: 'number', email: 'text' };
          return (
            <div key={field}>
              <input type={typeMap[field]} name={field} placeholder={field} value={formik.values[field]} onChange={handleChange} onBlur={handleBlur} className="w-full border px-3 py-2 rounded" />
              {formik.touched[field] && formik.errors[field] && <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>}
            </div>
          );
        })}

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto">
            Back
            <Ripple />
          </button>
          <button type="submit" className="p-ripple orange-ripple bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Create
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
