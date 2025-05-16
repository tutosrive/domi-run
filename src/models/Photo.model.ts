class Photo {
  id?: number;
  issue_id?: number;
  image_url?: string;
  caption?: string;
  taken_at?: Date;

  /**
   * @param id - Unique identifier for the photo
   * @param issue_id - Associated issue ID
   * @param image_url - URL of the photo
   * @param caption - Description or caption of the photo
   * @param taken_at - Date and time the photo was taken.
   */
  constructor(id?: number, issue_id?: number, image_url?: string, caption?: string, taken_at?: Date) {
    // Set all in a default value if not get from the constructor.
    this.id = id ?? -1;
    this.issue_id = issue_id ?? -1;
    this.image_url = image_url ?? '';
    this.caption = caption ?? '';
    this.taken_at = taken_at ?? new Date();
  }
}

export default Photo;
