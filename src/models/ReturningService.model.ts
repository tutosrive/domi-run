/** Base model to return data in the services */
class ReturningService {
  status: number;
  data?: object;
  error?: unknown | undefined;

  /**
   * @param status Request status code
   * @param data - If it doesn't have any error, data is the request response
   * @param error - If the request fails, this contains the error.
   */
  constructor(status: number, data?: object, error?: unknown | undefined) {
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
export default ReturningService;
