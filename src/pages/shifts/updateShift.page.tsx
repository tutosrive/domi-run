import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import shiftService from '../../services/shift.service';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UpdateShiftPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    start_time: '',
    end_time: '',
    status: '',
  });

  useEffect(() => {
    (async () => {
      const res = await shiftService.get_by_id(Number(id));
      const shift = res.data;
      setInitialValues({
        start_time: new Date(shift.start_time).toISOString().slice(0, 16),
        end_time: new Date(shift.end_time).toISOString().slice(0, 16),
        status: shift.status,
      });
    })();
  }, [id]);

  const validationSchema = Yup.object({
    start_time: Yup.date()
      .required('Hora de inicio es obligatoria')
      .typeError('Hora de inicio inválida'),
    end_time: Yup.date()
      .required('Hora de fin es obligatoria')
      .typeError('Hora de fin inválida')
      .min(
        Yup.ref('start_time'),
        'Hora de fin debe ser posterior a la hora de inicio'
      ),
    status: Yup.string()
      .required('Estado es obligatorio')
      .max(50, 'Estado demasiado largo'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const res = await shiftService.update(Number(id), values);
      if (res.status === 200) {
        Swal.fire({ title: 'Success', text: 'Shift updated successfully', icon: 'success' });
        navigate('/shifts/list');
      } else {
        Swal.fire({ title: 'Error', text: 'Failed to update shift', icon: 'error' });
      }
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar turno</h2>

      <input
        type="datetime-local"
        name="start_time"
        value={formik.values.start_time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      />
      {formik.touched.start_time && formik.errors.start_time && (
        <div className="text-red-600 text-sm">{formik.errors.start_time}</div>
      )}

      <input
        type="datetime-local"
        name="end_time"
        value={formik.values.end_time}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      />
      {formik.touched.end_time && formik.errors.end_time && (
        <div className="text-red-600 text-sm">{formik.errors.end_time}</div>
      )}

      <input
        type="text"
        name="status"
        value={formik.values.status}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border p-2 rounded"
      />
      {formik.touched.status && formik.errors.status && (
        <div className="text-red-600 text-sm">{formik.errors.status}</div>
      )}

      <button
        onClick={() => formik.handleSubmit()}
        disabled={!formik.isValid || formik.isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Guardar cambios
      </button>
    </div>
  );
}
