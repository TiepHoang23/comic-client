export interface IServiceResponse<T> {
  Data?: T;
  Status: number;
  Message?: string;
}
