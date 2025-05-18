class Customer {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;

  /**
   * Create a new object "Customer"
   * @param id - Unique identification
   * @param name - Full name of the customer
   * @param email - Customer's email address
   * @param phone - Customer's phone number
   */
  constructor(id?: number, name?: string, email?: string, phone?: string) {
    this.id = id ?? -1;
    this.name = name ?? '';
    this.email = email ?? '';
    this.phone = phone ?? '';
  }
}

export default Customer;
