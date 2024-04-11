import axios, { AxiosInstance } from "axios";

const ITEM_LIST_URL = "https://fakestoreapi.com";

const ItemAxiosInstance: AxiosInstance = axios.create({
  baseURL: ITEM_LIST_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ITEM_LIST_URL,
  },
});

export default ItemAxiosInstance;
