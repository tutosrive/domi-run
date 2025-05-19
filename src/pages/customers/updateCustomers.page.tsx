// src/pages/customers/updateCustomer.page.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customerService from '../../services/customer.service';
import Customer from '../../models/Customer.model';

export default function UpdateCustomersPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (customer) setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (customer) {
      const res = await customerService.post_customer(customer); // CAMBIO NECESARIO
      if (res.status === 200) {
        navigate('/customers/list');
      }
    }
  };

  if (!customer) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Actualizar cliente</h2>
      {['name', 'email', 'phone'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={(customer as any)[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border px-3 py-2 rounded"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Guardar cambios
      </button>
    </div>
  );
}
