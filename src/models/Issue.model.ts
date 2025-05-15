class Issue {
  id: number;
  motorcycle_id: number;
  description: string;
  issue_type: string;
  date_reported: Date;
  status: string;

  /**
   * @param id - Unique identifier for the issue
   * @param motorcycle_id - Associated motorcycle ID
   * @param description - Description of the issue
   * @param issue_type - Type of issue (e.g., maintenance, accident)
   * @param date_reported - Date and time the issue was reported
   * @param status - Current status of the issue (e.g., open, resolved)
   */
  constructor(id: number, motorcycle_id: number, description: string, issue_type: string, date_reported: Date, status: string) {
    this.id = id;
    this.motorcycle_id = motorcycle_id;
    this.description = description;
    this.issue_type = issue_type;
    this.date_reported = date_reported;
    this.status = status;
  }
}

export default Issue;
