class Order {
  id: number;
  quantity: number;
  total_price: number;
  status: string;
  motorcycle_id: number;
  customer_id: number;
  menu_id: number;

  /**
   * Create a new object “Order”
   * @param id - Unique identification
   * @param quantity - Quantity of products in the order
   * @param total_price - Total order price
   * @param status - Current status order (pending, in_progress, delivered, canceled)
   * @param motorcycle_id - Unique identifier of the motorcycle in charge of the order
   * @param customer_id - Unique identification of customer
   * @param menu_id - Unique identification of a menu.
   */
  constructor(id: number, quantity: number, total_price: number, status: string, motorcycle_id: number, customer_id: number, menu_id: number) {
    this.id = id;
    this.quantity = quantity;
    this.total_price = total_price;
    this.status = status;
    this.motorcycle_id = motorcycle_id;
    this.customer_id = customer_id;
    this.menu_id = menu_id;
  }
}

export default Order;
