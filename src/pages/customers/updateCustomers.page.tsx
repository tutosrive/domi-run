import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../services/customer.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ripple } from 'primereact/ripple';

export default function UpdateCustomerPage() {
  const { id } = useParams(); // Extract the customer ID from the URL
  const navigate = useNavigate(); // Navigation hook

  // State to store form values, including ID, ensures reactivity
  const [formValues, setFormValues] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
  });

  // Fetch existing customer data and populate form values (including ID)
  useEffect(() => {
    async function fetchCustomer() {
      const res = await customerService.get_data_by_id(Number(id));
      const data = res.data;
      setFormValues({
        id: data.id?.toString() || '', // Convert ID to string for input value
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
      });
    }
    fetchCustomer();
  }, [id]);

  // Validation schema without ID (not editable)
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Numbers only')
      .min(7, 'Minimum 7 digits')
      .max(15, 'Maximum 15 digits')
      .required('Phone is required'),
  });

  // Formik setup for handling form state and submission
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true, // Reinitialize when formValues change
    validationSchema,
    onSubmit: async (values) => {
      // Submit without the ID field, as update_customer takes ID param
      const { id: valueId, ...customerData } = values;
      const res = await customerService.update_customer(Number(valueId), customerData);
      if (res.status === 200) {
        Swal.fire({ title: 'Success', text: 'Customer updated successfully', icon: 'success' });
        navigate('/customers/list');
      } else {
        Swal.fire({ title: 'Error', text: 'Failed to update customer', icon: 'error' });
      }
    },
  });

  // Custom change handler to format phone and update state
  const handleChange = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    if (name === 'phone') {
      // Strip non-digit characters
      value = rawValue.replace(/\D/g, '');
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  // Custom blur handler trims and normalizes values
  const handleBlur = (e) => {
    const { name, value: rawValue } = e.target;
    let value = rawValue;

    if (name === 'name') value = rawValue.trim();
    if (name === 'email') value = rawValue.trim().toLowerCase();
    if (name === 'phone') value = rawValue.replace(/\D/g, '');

    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
    formik.handleBlur(e); // Call Formik's default blur handler
  };

  // Show loading while fetching data
  if (!formValues.id) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold text-center mb-6">Update Customer</h2>

      {/* Main form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Disabled ID field with label */}
        <div>
          <label htmlFor="id" className="block text-sm font-medium mb-1">
            ID
          </label>
          <input
            id="id"
            type="text"
            name="id"
            value={formik.values.id}
            disabled // Not editable
            className="w-full bg-gray-600 border px-3 py-2 rounded cursor-not-allowed"
          />
        </div>

        {/* Other editable fields with labels */}
        {['name', 'email', 'phone'].map((field) => {
          const typeMap = { name: 'text', email: 'text', phone: 'number' };
          const labelMap = { name: 'Name', email: 'Email', phone: 'Phone' };

          return (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium mb-1">
                {labelMap[field]}
              </label>
              <input id={field} type={typeMap[field]} name={field} placeholder={labelMap[field]} value={formik.values[field]} onChange={handleChange} onBlur={handleBlur} className="w-full border px-3 py-2 rounded" />
              {formik.touched[field] && formik.errors[field] && <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>}
            </div>
          );
        })}

        {/* Buttons: Back and Update */}
        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto">
            Back
            <Ripple />
          </button>
          <button type="submit" className="p-ripple orange-ripple bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto">
            Update
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
