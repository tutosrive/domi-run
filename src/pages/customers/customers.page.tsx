import React, { useEffect, useState } from 'react';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import Customer from '../../models/Customer.model';
import customerService from '../../services/customer.service';
import type ReturningService from '../../models/ReturningService.model';
import { useNavigate } from 'react-router-dom';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  const getCustomers = async () => {
    const resCustomers: ReturningService = await customerService.get_all_customer();
    const data: Customer[] = resCustomers.data ? (resCustomers.data as Customer[]) : [];
    setCustomers(data);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const removeCustomer = async (id: string | number) => {
    const req = await customerService.delete_customer(Number(id));
    if (req.status === 200) {
      alert(`Cliente con id (${id}) eliminado`);
      getCustomers(); 
    }
  };

  const dataTable: DataTableObject = {
    arrayData: customers,
    headerTable: <p>Customers</p>,
  };

  return (
    <>
      <div className="text-center mb-2">
        <h1>Customers</h1>
      </div>
      <div className="flex justify-center">
        {customers.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/customers/create',
                update: '/customers/update',
                view: '/customers/view',
              },
            }}
            onRemove={(id) => removeCustomer(id)}
          />
        ) : (
          <div className="w-screen h-screen fixed top-1/2">
            <LoaderPointsComponent />
          </div>
        )}
      </div>
    </>
  );
}
