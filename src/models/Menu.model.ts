class Menu {
  id?: number;
  restaurant_id?: number;
  product_id?: number;
  price?: number;
  availability?: boolean;

  /**
   * @param id - Unique identifier for the menu entry
   * @param restaurant_id - Restaurant offering the product
   * @param product_id - Product included in the menu
   * @param price - Price of the product in this menu
   * @param availability - Indicates if the product is currently available.
   */
  constructor(id?: number, restaurant_id?: number, product_id?: number, price?: number, availability?: boolean) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.restaurant_id = restaurant_id ?? -1;
    this.product_id = product_id ?? -1;
    this.price = price ?? -1;
    this.availability = availability ?? false;
  }
}

export default Menu;
