class Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category?: string;

  /**
   * Create a new object “Product”
   * @param id - Unique identification
   * @param name - Product name
   * @param description - Description of the product
   * @param price - Product price
   * @param category - Product category.
   */
  constructor(id?: number, name?: string, description?: string, price?: number, category?: string) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.name = name ?? '';
    this.description = description ?? '';
    this.price = price ?? -1;
    this.category = category ?? '';
  }
}

export default Product;
