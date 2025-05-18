import restaurantService from '../../services/restaurant.service';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableDataPrimeComponent, { type DataTableObject } from '../../components/TableDataPrime.component';
import LoaderPointsComponent from '../../components/LoaderPoints.component.tsx';
import Menu from '../../models/Menu.model';
import menuService from '../../services/menu.service.ts';
import Swal from 'sweetalert2';

export default function ViewRestaurantPage() {
  const { id } = useParams();
  const [data, setData] = useState<Menu[]>([]);
  const navigate = useNavigate();

  const orderData = (data) => {
    const menus = [];
    data.forEach((menu) => {
      menus.push({
        availability: menu.availability,
        id: menu.id,
        price: menu.price,
        product: menu.product.name,
        restaurant: menu.restaurant.name,
      });
    });
    return menus;
  };

  const Getdata = async () => {
    const req = await restaurantService.get_menus(id);
    console.log(req.data);
    if (req.status === 200 && req.data?.length > 0) {
      setData(orderData(req.data));
    }
  };
  useEffect(() => {
    Getdata();
  }, []);

  const removeMenu = async (idMenu) => {
    const req = await menuService.delete(idMenu);
    if (req.status === 200) {
      Swal.fire({
        title: 'Removed',
        text: `Menu with id "${idMenu}" has been removed from restaurant with id "${id}"`,
        icon: 'success',
        timer: 2000,
      });
    }
  };

  const dataTable: DataTableObject = {
    arrayData: data,
  };

  const navigators = {
    navigate: navigate,
    urls: {
      update: '/menu/update',
      view: '/menu/view',
      create: `/restaurant/${id}/menu/create`,
    },
  };

  return (
    <>
      <div className={'text-center'}>
        <h1>Menus Restaurant with id "{id}"</h1>
      </div>
      {data.length > 0 ? (
        <TableDataPrimeComponent data={dataTable} navigation={navigators} onRemove={(id) => removeMenu(id)} />
      ) : (
        <div className={'w-screen h-screen fixed top-1/2'}>
          <LoaderPointsComponent />
        </div>
      )}
    </>
  );
}
