import { useEffect, useState } from 'react';
import restaurantService from '../../services/restaurant.service';
import TableDataPrimeComponent from '../../components/TableDataPrime.component';
import { useNavigate } from 'react-router-dom';
import Restaurant from '../../models/Restaurant.model';
import ReturningService from '../../models/ReturningService.model';
import LoaderPointsComponent from '../../components/LoaderPoints.component';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    const res: ReturningService = await restaurantService.get_all_restaurant();
    if (res.status === 200 && Array.isArray(res.data)) {
      setRestaurants(res.data);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const removeRestaurant = async (id: string | number) => {
    await restaurantService.delete_restaurant(Number(id));
    await fetchRestaurants(); // refresca la tabla
  };

  const dataTable = {
    arrayData: restaurants,
    headerTable: <p>Restaurantes</p>,
  };

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Restaurantes</h1>
      </div>
      <div className="flex justify-center">
        {restaurants.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: '/restaurants/create',
                update: '/restaurants/update',
                view: '/restaurants/view',
              },
            }}
            onRemove={removeRestaurant}
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
