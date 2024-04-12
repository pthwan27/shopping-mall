import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { AxiosRequestConfig } from "axios";
import ItemAxiosInstance from "./http";
import { AnyOBJ } from "./types";

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });

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

export const QueryKey = {
  PRODUCTS: "PRODUCTS",
};
