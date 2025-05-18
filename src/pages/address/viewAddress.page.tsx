import React, { useState, useEffect } from 'react';
import addressService from '../../services/address.service.ts';
import { type ColumnDefinition, ReactTabulator } from 'react-tabulator';
import type ReturningService from '../../models/ReturningService.model.ts';
import { useParams } from 'react-router-dom';

export default function ViewAddressPage() {
  const [address, setAddress] = useState([{ id: '', order_id: '', city: '', street: '', state: '', postal_code: '', additional_info: '' }]);
  const { id } = useParams();

  const cols: Array<ColumnDefinition> = [
    //{ title: 'Action', formatter: (cell): ReactElement => actions_buttons(cell) },
    { title: 'ID', field: 'id', width: 50, hozAlign: 'center' },
    { title: 'Order ID', field: 'order_id', hozAlign: 'center' },
    { title: 'City', field: 'city' },
    { title: 'Street', field: 'street' },
    { title: 'State', field: 'state' },
    { title: 'Postal Code', field: 'postal_code', hozAlign: 'center' },
    { title: 'Additional Info', field: 'additional_info' },
  ];

  useEffect(() => {
    get_data();
  }, []);

  /** Get data from the backend */
  const get_data = async () => {
    try {
      console.log(id);
      const __req: ReturningService | undefined = await addressService.get_data_by_id(id);
      if (__req !== undefined && __req.status === 200) setAddress([__req.data]);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <div className={'container min-w-svw/10 mx-auto'}>
        <h1>List One</h1>
        <ReactTabulator options={{ layout: 'fitData' }} data={address} columns={cols} />
      </div>
    </>
  );
}
