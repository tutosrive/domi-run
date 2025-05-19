import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import issueService from '../../services/issue.service';
import motorcycleService from '../../services/motorcycle.service';

export default function UpdateIssuePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // suponer que el id viene por url params

  const [motorcycles, setMotorcycles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Para cargar issue y motocicletas
  useEffect(() => {
    (async () => {
      try {
        const [motorcyclesRes, issueRes] = await Promise.all([
          motorcycleService.get_all_motorcycle(),
          issueService.get_by_id(Number(id))
        ]);
        setMotorcycles(motorcyclesRes.data || []);

        if (issueRes.status === 200) {
          const issue = issueRes.data;
          formik.setValues({
            motorcycle_id: issue.motorcycle_id.toString(),
            description: issue.description || '',
            reported_at: issue.reported_at ? new Date(issue.reported_at).toISOString().slice(0, 16) : '',
            status: issue.status || '',
          });
        } else {
          Swal.fire('Error', 'No se encontró el problema', 'error');
          navigate('/issues/list');
        }
      } catch (error) {
        Swal.fire('Error', 'Error cargando datos', 'error');
        navigate('/issues/list');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      motorcycle_id: '',
      description: '',
      reported_at: '',
      status: '',
    },
    validationSchema: Yup.object({
      motorcycle_id: Yup.string().required('Selecciona una motocicleta'),
      description: Yup.string().required('La descripción es obligatoria'),
      reported_at: Yup.string().required('La fecha es obligatoria'),
      status: Yup.string().required('El estado es obligatorio'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          motorcycle_id: Number(values.motorcycle_id),
          description: values.description,
          reported_at: new Date(values.reported_at),
          status: values.status,
        };

        const res = await issueService.update(Number(id), payload);

        if (res.status === 200) {
          Swal.fire({ title: 'Success', text: 'Issue updated successfully', icon: 'success' });
          navigate('/issues/list');
        } else {
          Swal.fire({ title: 'Error', text: 'Failed to update restaurant', icon: 'error' });
        }
      } catch (error) {
        Swal.fire('Error', 'Error al actualizar', 'error');
      }
    },
  });

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar problema</h2>

      <form onSubmit={formik.handleSubmit}>
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
              {`${m.brand} ${m.model} - ${m.license_plate}`}
            </option>
          ))}
        </select>
        {formik.touched.motorcycle_id && formik.errors.motorcycle_id && (
          <p className="text-red-500 text-sm">{formik.errors.motorcycle_id}</p>
        )}

        <textarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Descripción del problema"
          className="w-full border p-2 rounded"
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm">{formik.errors.description}</p>
        )}

        <input
          type="datetime-local"
          name="reported_at"
          value={formik.values.reported_at}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full border p-2 rounded"
        />
        {formik.touched.reported_at && formik.errors.reported_at && (
          <p className="text-red-500 text-sm">{formik.errors.reported_at}</p>
        )}

        <input
          type="text"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Estado"
          className="w-full border p-2 rounded"
        />
        {formik.touched.status && formik.errors.status && (
          <p className="text-red-500 text-sm">{formik.errors.status}</p>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}
