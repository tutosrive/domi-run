import React, { useEffect, useState } from 'react';
import addressService from '../../services/address.service';
import type ReturningService from '../../models/ReturningService.model';
import 'tabulator-tables/dist/css/tabulator.min.css';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';

export default function ListAll() {
  const [addresses, setAddresses] = useState([{ id: '', order_id: '', city: '', street: '', state: '', postal_code: '', additional_info: '' }]);
  const cols: Array<ColumnDefinition> = [
    { title: 'ID', field: 'id', width: 50, hozAlign: 'center' },
    { title: 'Order ID', field: 'order_id', hozAlign: 'center' },
    { title: 'City', field: 'city' },
    { title: 'Street', field: 'street' },
    { title: 'State', field: 'state' },
    { title: 'Postal Code', field: 'postal_code', hozAlign: 'center' },
    { title: 'Additional Info', field: 'additional_info' },
  ];
  useEffect(() => {
    req_data();
  }, []);

  /** Get data from the backend */
  const req_data = async () => {
    const __req: ReturningService | undefined = await addressService.get_all_address();
    if (__req !== undefined && __req.status === 200) setAddresses(__req.data);
  };
  return (
    <>
      <div className={'card'}>
        <div className={'relative top-0'}>
          <h1>List All</h1>
        </div>
        <div className={'h-68 w-full'}>
          <ReactTabulator options={{ layout: 'fitData', height: '100%', paginationCounter: 'rows', pagination: 'local', paginationSize: 6, paginationSelector: [3, 6, 8] }} data={addresses} columns={cols} />
        </div>
        {/* Container list*/}
      </div>
    </>
  );
}
