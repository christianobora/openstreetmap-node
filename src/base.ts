import axios, { AxiosInstance } from "axios";

export abstract class MapClient {
  protected http: AxiosInstance = axios.create({ validateStatus: null });

  constructor() {}
}
