class Menu {
  id: number;
  restaurant_id: number;
  product_id: number;
  price: number;
  availability: boolean;

  /**
   * @param id - Unique identifier for the menu entry
   * @param restaurant_id - Restaurant offering the product
   * @param product_id - Product included in the menu
   * @param price - Price of the product in this menu
   * @param availability - Indicates if the product is currently available
   */
  constructor(id: number, restaurant_id: number, product_id: number, price: number, availability: boolean) {
    this.id = id;
    this.restaurant_id = restaurant_id;
    this.product_id = product_id;
    this.price = price;
    this.availability = availability;
  }
}

export default Menu;
