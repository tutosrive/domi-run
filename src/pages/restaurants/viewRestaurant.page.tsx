import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import restaurantService from '../../services/restaurant.service';
import menuService from '../../services/menu.service';
import Restaurant from '../../models/Restaurant.model';
import Menu from '../../models/Menu.model';

export default function ViewRestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (!id) return; // Asegura que `id` existe antes de usarlo

    const fetchData = async () => {
      const res = await restaurantService.get_data_by_id(Number(id));
      setRestaurant(res.data as Restaurant);

      const resMenus = await menuService.get_by_restaurant(Number(id));
      setMenus(resMenus.data as Menu[]);
    };
    fetchData();
  }, [id]);

  if (!restaurant) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurante: {restaurant.name}</h2>
      <p>
        <strong>Dirección:</strong> {restaurant.address}
      </p>
      <p>
        <strong>Teléfono:</strong> {restaurant.phone}
      </p>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Menú del Restaurante</h3>
        <button onClick={() => navigate(`/menus/create`)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Agregar Menú
        </button>
      </div>

      {menus.length > 0 ? (
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{menu.title}</p>
                <p className="text-sm">{menu.description}</p>
              </div>
              <button onClick={() => navigate(`/menus/update/${menu.id}`)} className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded">
                Editar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay menús registrados.</p>
      )}
    </div>
  );
}
