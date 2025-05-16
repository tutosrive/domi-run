class Shift {
  id?: number;
  driver_id?: number;
  motorcycle_id?: number;
  start_time?: Date;
  end_time?: Date;
  status?: string;

  /**
   * @param id - Unique identifier for the shift
   * @param driver_id - ID of the driver assigned
   * @param motorcycle_id - ID of the motorcycle used
   * @param start_time - Shift start datetime
   * @param end_time - Shift end datetime
   * @param status - Current status of the shift.
   */
  constructor(id?: number, driver_id?: number, motorcycle_id?: number, start_time?: Date, end_time?: Date, status?: string) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.driver_id = driver_id ?? -1;
    this.motorcycle_id = motorcycle_id ?? -1;
    this.start_time = start_time ?? new Date();
    this.end_time = end_time ?? new Date();
    this.status = status ?? '';
  }
}

export default Shift;
