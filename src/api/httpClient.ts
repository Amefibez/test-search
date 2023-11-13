import axios, { ResponseType } from "axios";
import config from "./config";

const baseHeaders = { ...config.acceptHeader };

export interface IRequest {
  url: string;
  method?: string;
  responseType?: ResponseType;
  headers?: any;
  params?: any;
  data?: any;
  paramsSerializer?: (params: object | string) => string;
}

const makeRequest = ({
  url = "/",
  method = "get",
  headers,
  params,
  data,
  responseType = "json",
  paramsSerializer,
}: IRequest) =>
  axios({
    url,
    method,
    responseType,
    headers: { ...baseHeaders, ...headers },
    params,
    data,
    paramsSerializer,
  });

export default makeRequest;
