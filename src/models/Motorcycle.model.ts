class Motorcycle {
  id?: number;
  license_plate?: string;
  brand?: string;
  year?: string;
  status?: string;

  /**
   * Create a new object "Motorcycle"
   * @param id - Unique identification
   * @param license_plate - Unique motorcycle registration number
   * @param brand - Brand name
   * @param year - motorcycle model
   * @param status - Motorcycle availability
   */
  constructor(id?: number, license_plate?: string, brand?: string, year?: string, status?: string) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.license_plate = license_plate ?? '';
    this.brand = brand ?? '';
    this.year = year ?? '';
    this.status = status ?? '';
  }
}

export default Motorcycle;
