class Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;

  /**
   * Create a new object “Restaurant”
   * @param id - Unique identification
   * @param name - Restaurant name
   * @param address - Restaurant address
   * @param phone - Restaurant contact to orders
   * @param email - Restaurant email contact.
   */
  constructor(id: number, name: string, address: string, phone: string, email: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }
}

export default Restaurant;
