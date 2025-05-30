import React, { useEffect, useState } from 'react';
import addressService from '../../services/address.service';
import type ReturningService from '../../models/ReturningService.model';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import { useNavigate } from 'react-router-dom';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  /** Get data from the backend */
  const req_data = async () => {
    const __req: ReturningService | undefined = await addressService.get_all_address();
    if (__req !== undefined && __req.status === 200) setAddresses(__req.data);
  };

  useEffect(() => {
    req_data();
  }, []);

  const dataTable: DataTableObject = {
    arrayData: addresses,
    headerTable: 'Addresses',
  };
  const navigators = {
    navigate: navigate,
    urls: {
      update: '/addresses/update',
      view: '/addresses/view',
      create: '/addresses/create',
    },
  };
  return (
    <>
      <div className={'text-center mb-2'}>
        <h1>Addresses</h1>
      </div>
      {addresses.length > 0 ? (
        <>
          <div className={'flex justify-center'}>{addresses.length > 0 && <TableDataPrimeComponent data={dataTable} navigation={navigators} />}</div>
        </>
      ) : (
        <div className={'w-screen h-screen fixed top-1/2'}>
          <LoaderPointsComponent />
        </div>
      )}
    </>
  );
}
