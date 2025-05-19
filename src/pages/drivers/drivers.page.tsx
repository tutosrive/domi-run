import React, { useEffect, useState } from 'react';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import Driver from '../../models/Driver.model.ts';
import driverService from '../../services/driver.service.ts';
import type ReturningService from '../../models/ReturningService.model.ts';
import { useNavigate } from 'react-router-dom';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const navigate = useNavigate();

  const getDrivers = async () => {
    const resDrivers: ReturningService = await driverService.get_all_driver();
    const data: Driver[] = resDrivers.data ? (resDrivers.data as Driver[]) : [];
    setDrivers(data);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const removeDriver = async (id: string | number) => {
    await driverService.delete_driver(Number(id));
    await getDrivers(); // refresca la tabla después de eliminar
  };

  const dataTable: DataTableObject = {
    arrayData: drivers,
    headerTable: <p>Drivers</p>,
  };

  return (
    <>
      <div className={'text-center mb-2'}>
        <h1>Drivers</h1>
      </div>
      <div className={'flex justify-center'}>
        {drivers.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/drivers/create',
                update: '/drivers/update',
                view: '/drivers/view',
              },
            }}
            onRemove={removeDriver}
          />
        ) : (
          <div className={'w-screen h-screen fixed top-1/2'}>
            <LoaderPointsComponent />
          </div>
        )}
      </div>
    </>
  );
}