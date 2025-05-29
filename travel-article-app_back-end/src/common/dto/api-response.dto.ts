export class ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;

  constructor(data: T, message = 'Operation Success') {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
