// src/pages/customers/viewCustomer.page.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customerService from '../../services/customer.service';
import Customer from '../../models/Customer.model';

export default function ViewCustomersPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await customerService.get_data_by_id(Number(id));
      setCustomer(res.data as Customer);
    };
    fetch();
  }, [id]);

  if (!customer) return <p>Cargando...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-2 text-lg">
      <h2 className="font-bold text-xl text-center">Detalles del cliente</h2>
      <p><strong>Nombre:</strong> {customer.name}</p>
      <p><strong>Teléfono:</strong> {customer.phone}</p>
      <p><strong>Email:</strong> {customer.email}</p>
    </div>
  );
}
