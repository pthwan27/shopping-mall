import GlobalLayout from "./pages/_layout";
import Index from "./pages/index";
import ProductsIndex from "./pages/products/index";
import ProductsId from "./pages/products/[id]";
import PaymentIndex from "./pages/payment/index";
import CartIndex from "./pages/cart/index";
import AdminIndex from "./pages/admin/index";

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <Index />, index: true },
      { path: "/cart", element: <CartIndex /> },
      { path: "/payment", element: <PaymentIndex /> },
      { path: "/products", element: <ProductsIndex /> },
      { path: "/admin", element: <AdminIndex /> },
      { path: "/products/:id", element: <ProductsId /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/payment" },
  { route: "/products" },
  { route: "/products/:id" },
  { route: "/admin" },
];
