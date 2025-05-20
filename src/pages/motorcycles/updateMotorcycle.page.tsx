// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import motorcycleService from '../../services/motorcycle.service';
// import Motorcycle from '../../models/Motorcycle.model';

// export default function UpdateMotorcyclePage() {
//   const [form, setForm] = useState<Motorcycle>(new Motorcycle());
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await motorcycleService.get_data_by_id(Number(id));
//       setForm(res.data as Motorcycle);
//     };
//     fetch();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const res = await motorcycleService.update_motorcycle(Number(id), form);
//     if (res.status === 200) {
//       alert('Moto actualizada');
//       navigate('/motorcycles/list');
//     } else {
//       alert('Error al actualizar');
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-md p-4">
//       <h1 className="text-xl font-semibold mb-4">Actualizar Moto</h1>
//       <input name="license_plate" value={form.license_plate} onChange={handleChange} className="input mb-2" />
//       <input name="brand" value={form.brand} onChange={handleChange} className="input mb-2" />
//       <input name="year" value={form.year} onChange={handleChange} className="input mb-2" />
//       <input name="status" value={form.status} onChange={handleChange} className="input mb-2" />
//       <button className="btn" onClick={handleSubmit}>Guardar</button>
//     </div>
//   );
// }
import { Ripple } from 'primereact/ripple';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import motorcycleService from '../../services/motorcycle.service';
import Motorcycle from '../../models/Motorcycle.model';
import { useEffect } from 'react';

export default function UpdateMotorcyclePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
    enableReinitialize: true,
    initialValues: {
      id: Number(id) || 0,
      license_plate: '',
      brand: '',
      year: new Date().getFullYear(),
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await motorcycleService.update_motorcycle(values.id, values);
        if (res.status === 200) {
          await Swal.fire({
            title: 'Success',
            text: 'Motorcycle updated successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/motorcycles/list');
        } else {
          throw new Error();
        }
      } catch {
        await Swal.fire({
          title: 'Error',
          text: 'Failed to update motorcycle',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  // Fetch existing data
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await motorcycleService.get_data_by_id(Number(id));
        const moto = res.data as Motorcycle;
        formik.setValues({
          id: moto.id,
          license_plate: moto.license_plate,
          brand: moto.brand,
          year: moto.year,
          status: moto.status,
        });
      }
    })();
  }, [id]);

  const fields: (keyof Motorcycle)[] = ['id', 'license_plate', 'brand', 'year', 'status'];

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6 px-4">
      <h2 className="text-2xl font-bold text-center">Update Motorcycle</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm sm:text-base font-medium mb-1">
              {field === 'id' ? 'ID' : field === 'license_plate' ? 'Plate' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={field === 'year' ? 'number' : 'text'}
              name={field}
              value={formik.values[field] as any}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={field === 'id' ? '' : field === 'license_plate' ? 'e.g. ABC123' : field === 'brand' ? 'e.g. Yamaha' : field === 'year' ? 'e.g. 2023' : 'e.g. Active'}
              disabled={field === 'id'}
              className={`w-full border px-3 py-2 rounded bg-gray-600 text-white`}
            />
            {field !== 'id' && formik.touched[field] && formik.errors[field] && <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button type="button" onClick={() => navigate(-1)} className="p-ripple orange-ripple bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded relative overflow-hidden">
            Back
            <Ripple />
          </button>
          <button type="submit" className="p-ripple orange-ripple bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded relative overflow-hidden">
            Update Motorcycle
            <Ripple />
          </button>
        </div>
      </form>
    </div>
  );
}
