// src/pages/menus/viewMenu.page.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import menuService from '../../services/menu.service';
import Menu from '../../models/Menu.model';
import LoaderPointsComponent from '../../components/LoaderPoints.component';

export default function ViewMenuPage() {
  const { id } = useParams();
  const [menu, setMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await menuService.get_by_id(Number(id));
      if (res.status === 200) setMenu(res.data as Menu);
    };
    fetchData();
  }, [id]);

  if (!menu) return <LoaderPointsComponent />;

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold text-center">Detalles del Menú</h2>
      <div className="space-y-2">
        <p><strong>Producto:</strong> {menu.product?.name}</p>
        <p><strong>Precio:</strong> ${menu.price}</p>
        <p><strong>Disponibilidad:</strong> {menu.availability}</p>
        <p><strong>Restaurante:</strong> {menu.restaurant?.name}</p>
      </div>
    </div>
  );
}