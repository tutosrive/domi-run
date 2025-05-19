import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import shiftService from '../../services/shift.service';
import driverService from '../../services/driver.service';
import motorcycleService from '../../services/motorcycle.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function CreateShiftPage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState<any[]>([]);
  const [motorcycles, setMotorcycles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const d = await driverService.get_all_driver();
      setDrivers(d.data || []);
      const m = await motorcycleService.get_all_motorcycle();
      setMotorcycles(m.data || []);
    })();
  }, []);

  const validationSchema = Yup.object({
    driver_id: Yup.number()
      .required('Conductor es obligatorio')
      .typeError('Conductor es obligatorio'),
    motorcycle_id: Yup.number()
      .required('Motocicleta es obligatoria')
      .typeError('Motocicleta es obligatoria'),
    start_time: Yup.date()
      .required('Hora de inicio es obligatoria')
      .typeError('Hora de inicio inválida'),
    end_time: Yup.date()
      .required('Hora de fin es obligatoria')
      .typeError('Hora de fin inválida')
      .min(
        Yup.ref('start_time'),
        'Hora de fin debe ser posterior a hora de inicio'
      ),
    status: Yup.string()
      .required('Estado es obligatorio')
      .max(50, 'Estado demasiado largo'),
  });

  const formik = useFormik({
    initialValues: {
      driver_id: '',
      motorcycle_id: '',
      start_time: '',
      end_time: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        driver_id: Number(values.driver_id),
        motorcycle_id: Number(values.motorcycle_id),
        start_time: new Date(values.start_time),
        end_time: new Date(values.end_time),
        status: values.status,
      };
      const res = await shiftService.create(payload);
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: 'Success',
          text: 'Shift created successfully',
          icon: 'success',
        });
        navigate('/shifts/list');
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to create shift',
          icon: 'error',
        });
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Crear nuevo turno</h2>

      <select
        name="driver_id"
        value={formik.values.driver_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      >
        <option value="">Selecciona conductor</option>
        {drivers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      {formik.touched.driver_id && formik.errors.driver_id ? (
        <div className="text-red-600 text-sm">{formik.errors.driver_id}</div>
      ) : null}

      <select
        name="motorcycle_id"
        value={formik.values.motorcycle_id}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      >
        <option value="">Selecciona motocicleta</option>
        {motorcycles.map((m) => (
          <option key={m.id} value={m.id}>
            {m.license_plate}
          </option>
        ))}
      </select>
      {formik.touched.motorcycle_id && formik.errors.motorcycle_id ? (
        <div className="text-red-600 text-sm">{formik.errors.motorcycle_id}</div>
      ) : null}

      <input
        type="datetime-local"
        name="start_time"
        value={formik.values.start_time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      />
      {formik.touched.start_time && formik.errors.start_time ? (
        <div className="text-red-600 text-sm">{formik.errors.start_time}</div>
      ) : null}

      <input
        type="datetime-local"
        name="end_time"
        value={formik.values.end_time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      />
      {formik.touched.end_time && formik.errors.end_time ? (
        <div className="text-red-600 text-sm">{formik.errors.end_time}</div>
      ) : null}

      <input
        type="text"
        name="status"
        placeholder="Estado"
        value={formik.values.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      />
      {formik.touched.status && formik.errors.status ? (
        <div className="text-red-600 text-sm">{formik.errors.status}</div>
      ) : null}

      <button
        onClick={() => formik.handleSubmit()}
        disabled={!formik.isValid || formik.isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Crear
      </button>
    </div>
  );
}
