import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Shift from '../../models/Shift.model';
import shiftService from '../../services/shift.service';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import ReturningService from '../../models/ReturningService.model';
import LoaderPointsComponent from '../../components/LoaderPoints.component';

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<any[]>([]); // Usamos `any` para datos aplanados
  const navigate = useNavigate();

  const getShifts = async () => {
    const res: ReturningService = await shiftService.get_all();
    const originalData = res.data as Shift[];

    // Convertimos campos tipo Date y objetos a texto legible
    const formatted = originalData.map((s) => ({
  id: s.id,
  driver_id: typeof s.driver_id === 'object' ? (s.driver_id as any).name : s.driver_id,
  motorcycle_id: typeof s.motorcycle_id === 'object' ? (s.motorcycle_id as any).license_plate : s.motorcycle_id,
  start_time: new Date(s.start_time!).toLocaleString(),
  end_time: new Date(s.end_time!).toLocaleString(),
  status: s.status,
}));
    setShifts(formatted);
  };

  useEffect(() => {
    getShifts();
  }, []);

  const removeShift = async (id: string | number) => {
    await shiftService.delete(Number(id));
    await getShifts();
  };

  const dataTable: DataTableObject = {
    arrayData: shifts,
    headerTable: <p>Shifts</p>,
  };

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Lista de Turnos</h1>
      </div>
      <div className="flex justify-center">
        {shifts.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/shifts/create',
                update: '/shifts/update',
                view: '/shifts/view',
              },
            }}
            onRemove={removeShift}
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
