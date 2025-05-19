import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearCart } from '../../slice/cart.slice';
import { useEffect, useState, useRef } from 'react';
import shiftService from '../../services/shift.service';
import orderService from '../../services/order.service';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    const t = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(t);
  }, [items]);

  const handleOrder = async () => {
    if (items.length === 0) return;

    const resShifts = await shiftService.get_all();
    const validShift = Array.isArray(resShifts.data)
      ? resShifts.data.find((s) => s.status === 'active') // según backend
      : null;

    if (!validShift) {
      toastRef.current?.show({ severity: 'warn', summary: 'Sin turnos disponibles' });
      return;
    }

    const firstItem = items[0];
    if (!firstItem) return;

    const orderPayload = {
      customer_id: 1, // reemplazar con ID dinámico si tienes auth
      menu_id: firstItem.product.id,
      motorcycle_id: validShift.motorcycle_id,
      quantity: firstItem.quantity,
      total_price: firstItem.quantity * firstItem.product.price,
      status: 'pending',
    };

    const res = await orderService.create_order(orderPayload);
    if (res.status === 200) {
      toastRef.current?.show({ severity: 'success', summary: 'Pedido asignado', detail: 'El pedido fue enviado.' });
      dispatch(clearCart());
      new Audio('/notification.mp3').play(); // asegúrate de tenerlo en /public
    } else {
      toastRef.current?.show({ severity: 'error', summary: 'Error al crear pedido' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Toast ref={toastRef} />
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="border p-3 rounded bg-blue">
              <div className="flex justify-between">
                <span>{item.product.name}</span>
                <span>{item.quantity} x ${item.product.price}</span>
              </div>
            </div>
          ))}
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button onClick={handleOrder} label="Hacer pedido" className="w-full mt-4" />
        </div>
      )}
    </div>
  );
}