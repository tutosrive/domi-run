import { Ripple } from 'primereact/ripple';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';

export default function CreateMotorcyclePage() {
  const navigate = useNavigate();

  // Validation schema: alphanumeric plate, non-empty brand/status, valid year
  const validationSchema = Yup.object({
    license_plate: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, 'Letters and numbers only')
      .min(3, 'At least 3 characters')
      .required('Plate is required'),
    brand: Yup.string().min(2, 'At least 2 characters').required('Brand is required'),
    year: Yup.number().typeError('Year must be a number').min(1900, 'Must be 1900 or later').max(new Date().getFullYear(), `Cannot exceed ${new Date().getFullYear()}`).required('Year is required'),
    status: Yup.string().required('Status is required'),
  });

  const formik = useFormik<Motorcycle>({
    initialValues: {
      license_plate: '',
      brand: '',
      year: 0,
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await motorcycleService.post_motorcycle(values);
        if (res.status === 200 || res.status === 201) {
          await Swal.fire({
            title: 'Success',
            text: 'Motorcycle created successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/motorcycles/list');
        }
      } catch {
        await Swal.fire({
          title: 'Error',
          text: 'Failed to create motorcycle',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  const fields: (keyof Motorcycle)[] = ['license_plate', 'brand', 'year', 'status'];

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Create New Motorcycle</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <input
              type={field === 'year' ? 'number' : 'text'}
              name={field}
              value={formik.values[field] as any}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field === 'license_plate' ? 'Plate (e.g., ABC123)' : field === 'brand' ? 'Brand' : field === 'year' ? 'Year (e.g., 2023)' : 'Status'}
              className="w-full border px-3 py-2 rounded"
            />
            {formik.touched[field] && formik.errors[field] && <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded relative overflow-hidden">
            Back
            <Ripple />
          </button>
          <button type="submit" className="p-ripple orange-ripple bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded relative overflow-hidden">
            Create Motorcycle
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
