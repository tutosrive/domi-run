// src/pages/menus/menus.page.tsx
import { useEffect, useState } from 'react';
import menuService from '../../services/menu.service';
import Menu from '../../models/Menu.model';
import type { DataTableObject } from '../../components/TableDataPrime.component';
import LoaderPointsComponent from '../../components/LoaderPoints.component';
import { useNavigate } from 'react-router-dom';
import TableDataPrimeComponent from '../../components/TableDataPrime.component';

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const navigate = useNavigate();

  const fetchMenus = async () => {
    const res = await menuService.get_all();
    if (res.status === 200) {
      const data: Menu[] = res.data as Menu[];
      const formatted = data.map((menu) => ({
        ...menu,
        product: menu.product?.name,
        restaurant: menu.restaurant?.name,
      }));
      setMenus(formatted);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const dataTable: DataTableObject = {
    arrayData: menus,
    headerTable: <p>All Menus</p>,
  };

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">Lista de Menús (Global)</h1>
      </div>
      <div className="flex justify-center">
        {menus.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                update: '/menus/update',
                view: '/menus/view',
                // Nota: No se permite crear desde esta página
              },
            }}
            // No se pasa onRemove porque aquí no se permite eliminar
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
