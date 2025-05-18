class Driver {
  id?: number;
  name?: string;
  license_number?: string;
  phone?: string;
  email?: string;
  status?: string;

  /**
   * Create a new object "Driver"
   * @param id - Unique identification
   * @param name - Full name of the driver
   * @param license_number - Driver's license number
   * @param phone - Driver's phone number
   * @param email - Driver's email address
   * @param status - Driver's current status
   */
  constructor(id?: number, name?: string, license_number?: string, phone?: string, email?: string, status?: string) {
    this.id = id ?? -1;
    this.name = name ?? '';
    this.license_number = license_number ?? '';
    this.phone = phone ?? '';
    this.email = email ?? '';
    this.status = status ?? '';
  }
}

export default Driver;
