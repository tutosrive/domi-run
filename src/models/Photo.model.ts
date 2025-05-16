class Photo {
  id: number;
  issue_id: number;
  image_url: string;
  caption: string;
  taken_at: Date;

  /**
   * @param id - Unique identifier for the photo
   * @param issue_id - Associated issue ID
   * @param image_url - URL of the photo
   * @param caption - Description or caption of the photo
   * @param taken_at - Date and time the photo was taken
   */
  constructor(id: number, issue_id: number, image_url: string, caption: string, taken_at: Date) {
    this.id = id;
    this.issue_id = issue_id;
    this.image_url = image_url;
    this.caption = caption;
    this.taken_at = taken_at;
  }
}

export default Photo;
