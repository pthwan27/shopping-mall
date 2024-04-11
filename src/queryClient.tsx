import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { AxiosRequestConfig } from "axios";
import ItemAxiosInstance from "./http";
// import { getTodos, postTodo } from "../my-api";
type AnyOBJ = { [key: string]: any };
// Create a client
export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client) client = new QueryClient();

    return client;
  };
})();

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "DELETE" | "PATCH";
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    const url: string = path;
    const axiosOptions: AxiosRequestConfig = {
      method,
      params,
      data: body,
    };

    const res = await ItemAxiosInstance(url, axiosOptions);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const QueryKey = {
  PRODUCTS: "PRODUCTS",
};
