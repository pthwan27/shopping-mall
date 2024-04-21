import { QueryClient } from "@tanstack/react-query";
import request, { RequestDocument } from "graphql-request";

import { AxiosRequestConfig } from "axios";
import ItemAxiosInstance from "./http";

type AnyOBJ = { [key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });

    return client;
  };
})();

export const restfetcher = async ({
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
    };

    if (params) {
      const searchParams = new URLSearchParams(params);
      path += "?" + searchParams.toString();
    }

    if (body) {
      axiosOptions.data = body;
    }

    const res = await ItemAxiosInstance(url, axiosOptions);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const BASE_URL = "/";

export const graphqlFetcher = <T,>(query: RequestDocument, variables = {}) =>
  request<T>(BASE_URL, query, variables);

export const QueryKey = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
