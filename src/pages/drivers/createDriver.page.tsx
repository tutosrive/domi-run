import { Ripple } from 'primereact/ripple';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import driverService from '../../services/driver.service';
import Driver from '../../models/Driver.model';

export default function CreateDriverPage() {
  const navigate = useNavigate();

  // Validation schema with international phone and alphanumeric license
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Name is required'),
    license_number: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, 'Letters and numbers only')
      .min(5, 'Minimum 5 characters')
      .required('License number is required'),
    phone: Yup.string()
      .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone format (e.g., +57123456789)')
      .required('Phone is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    status: Yup.string().required('Status is required'),
  });

  // Custom phone number handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Allow only numbers and +
    value = value.replace(/[^0-9+]/g, '');
    // Ensure only one + at the beginning
    if ((value.match(/\+/g) || []).length > 1) {
      value = '+' + value.replace(/\+/g, '');
    }
    formik.setFieldValue('phone', value);
  };

  const formik = useFormik<Driver>({
    initialValues: {
      name: '',
      license_number: '',
      phone: '',
      email: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await driverService.post_driver(values);
        if (res.status === 200 || res.status === 201) {
          Swal.fire({
            title: 'Success',
            text: 'Driver created successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/drivers/list');
        }
      } catch (error) {
        console.warn(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to create driver',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },
  });

  const driverFields: (keyof Driver)[] = ['name', 'license_number', 'phone', 'email', 'status'];

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Create New Driver</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {driverFields.map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              value={formik.values[field]}
              onChange={field === 'phone' ? handlePhoneChange : formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field === 'phone' ? 'Phone (e.g., +57123456789)' : field === 'license_number' ? 'License Number (letters & numbers)' : field.replace('_', ' ').toUpperCase()}
              className="w-full border px-3 py-2 rounded"
            />
            {formik.touched[field] && formik.errors[field] && <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
            Back
            <Ripple />
          </button>
          <button type="submit" className="p-ripple orange-ripple bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Create Driver
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
