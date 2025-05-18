import React, { Suspense, useEffect, useState } from 'react';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import Restaurant from '../../models/Restaurant.model';
import restaurantService from '../../services/restaurant.service';
import type ReturningService from '../../models/ReturningService.model';
import { useNavigate } from 'react-router-dom';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';

export default function RestaurantsPage() {
  //   Restaurants list (from a backend)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  const getRestaurants = async () => {
    const res_restaurants: ReturningService = await restaurantService.get_all_restaurant();
    const data: Restaurant[] = res_restaurants.data ? (res_restaurants.data as Restaurant[]) : [new Restaurant()];
    console.log('DATA => ', data);
    // Set the restaurant list
    setRestaurants(data);
    console.log(restaurants);
  };

  useEffect(() => {
    // When load, get data
    getRestaurants();
  }, []);

  const removeRestaurant = async (id: string | number) => {
    const req = await restaurantService.delete_restaurant(id);
    if (req.status === 200) {
      alert(`Restaurante con id (${id}) eliminado`);
    }
  };
  const dataTable: DataTableObject = {
    arrayData: restaurants,
    headerTable: <p>Restaurants</p>,
  };

  return (
    <>
      <div className={'text-center mb-2'}>
        <h1>Restaurants</h1>
      </div>
      <div className={'flex justify-center'}>
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
            onRemove={(id) => removeRestaurant(id)}
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
