import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

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

const BASE_URL = "https://fakestoreapi.com";
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
    const url: RequestInfo | URL = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const QueryKey = {
  PRODUCTS: "PRODUCTS",
};
