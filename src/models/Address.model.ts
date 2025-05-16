class Address {
  id?: number;
  order_id?: number;
  city?: string;
  street?: string;
  state?: string;
  postal_code?: string;
  additional_info?: string;
  /**
   * Create a new object “Address”
   * @param id - Unique identifier Address
   * @param order_id - Unique identifier order
   * @param city - Name city
   * @param street - Street information
   * @param state - State information
   * @param postal_code - String postal code
   * @param additional_info - Info for add to address.
   */
  constructor(id?: number, order_id?: number, city?: string, street?: string, state?: string, postal_code?: string, additional_info?: string) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.order_id = order_id ?? -1;
    this.city = city ?? '';
    this.street = street ?? '';
    this.state = state ?? '';
    this.postal_code = postal_code ?? '';
    this.additional_info = additional_info ?? '';
  }
}

export default Address;
