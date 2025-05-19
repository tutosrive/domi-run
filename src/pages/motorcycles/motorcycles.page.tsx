import React, { useEffect, useState } from 'react';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import Motorcycle from '../../models/Motorcycle.model';
import motorcycleService from '../../services/motorcycle.service';
import type ReturningService from '../../models/ReturningService.model';
import { useNavigate } from 'react-router-dom';
import LoaderPointsComponent from '../../components/LoaderPoints.component';

export default function MotorcyclesPage() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const navigate = useNavigate();

  const getMotorcycles = async () => {
    const res: ReturningService = await motorcycleService.get_all_motorcycle();
    const data: Motorcycle[] = res.data ? (res.data as Motorcycle[]) : [];
    setMotorcycles(data);
  };

  useEffect(() => {
    getMotorcycles();
  }, []);

  const removeMotorcycle = async (id: string | number) => {
    await motorcycleService.delete_motorcycle(Number(id));
    await getMotorcycles(); // Refresh after delete
  };

  const dataTable: DataTableObject = {
    arrayData: motorcycles,
    headerTable: <p>Motorcycles</p>,
  };

  return (
    <>
      <div className="text-center mb-2">
        <h1>Motorcycles</h1>
      </div>
      <div className="flex justify-center">
        {motorcycles.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/motorcycles/create',
                update: '/motorcycles/update',
                view: '/motorcycles/view',
              },
            }}
            onRemove={removeMotorcycle}
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
