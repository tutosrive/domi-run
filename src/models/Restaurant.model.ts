import Address from './Address.model';

class Restaurant {
  id?: number;
  name?: string;
  address?: Address;
  phone?: string;
  email?: string;

  /**
   * Create a new object “Restaurant”
   * @param id - Unique identification
   * @param name - Restaurant name
   * @param address - Restaurant address
   * @param phone - Restaurant contact to orders
   * @param email - Restaurant email contact.
   */
  constructor(id?: number, name?: string, address?: Address, phone?: string, email?: string) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.name = name ?? '';
    this.address = address ?? new Address();
    this.phone = phone ?? '';
    this.email = email ?? '';
  }
}

export default Restaurant;
