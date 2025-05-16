class Issue {
  id?: number;
  motorcycle_id?: number;
  description?: string;
  issue_type?: string;
  date_reported?: Date;
  status?: string;

  /**
   * @param id - Unique identifier for the issue
   * @param motorcycle_id - Associated motorcycle ID
   * @param description - Description of the issue
   * @param issue_type - Type of issue (e.g., maintenance, accident)
   * @param date_reported - Date and time the issue was reported
   * @param status - Current status of the issue (e.g., open, resolved)
   */
  constructor(id?: number, motorcycle_id?: number, description?: string, issue_type?: string, date_reported?: Date, status?: string) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.motorcycle_id = motorcycle_id ?? -1;
    this.description = description ?? '';
    this.issue_type = issue_type ?? '';
    this.date_reported = date_reported ?? new Date();
    this.status = status ?? '';
  }
}

export default Issue;
