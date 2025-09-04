import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout";
import HomePage from "../customer/pages/homepage/HomePage";
import ProductPage from "../customer/pages/ProductPage/ProductPage";
import CartPage from "../customer/pages/CartPage/CartPage";
import CategoryPage from "../customer/pages/CategoryPage/CategoryPage";
import LoginPage from "../customer/pages/LoginPage/LoginPage";
import AdminLayout from "../Layouts/AdminLayout";
import Jwt from "../reusables/Jwt";
import Logout from "../reusables/Logout";
import TokenCheck from "../reusables/TokenCheck";
import Wishlist from "../customer/pages/WishlistPage/WishlistPage";
import CheckoutPage from "../customer/pages/CheckoutPage/CheckoutPage";
import MyOrdersPage from "../customer/pages/OrderPage/MyOrdersPage";
import OrderPage from "../customer/pages/OrderPage/OrderPage";
import AdminDashboard from "../admin/pages/Dashboard/AdminDashboard";
import AdminOrdersPage from "../admin/pages/OrderPage/AdminOrdersPage";
import AdminOrderDetailePage from "../admin/pages/OrderPage/AdminOrderDetailPage";
import AdminProductPage from "../admin/pages/ProductPage/AdminProductPage";
import AddProduct from "../admin/pages/ProductPage/AdminProductHandle/Add/AddProduct";
import AddBanner from "../admin/pages/ProductPage/AdminProductHandle/Add/AddBanner";
import AddCategoryGrid from "../admin/pages/ProductPage/AdminProductHandle/Add/AddCategoryGrid";
import AddNavbar from "../admin/pages/ProductPage/AdminProductHandle/Add/AddNavbar";
import RemoveProducts from "../admin/pages/ProductPage/AdminProductHandle/Remove/RemoveProducts";
import RemoveBanners from "../admin/pages/ProductPage/AdminProductHandle/Remove/RemoveBanners";
import RemoveNavbar from "../admin/pages/ProductPage/AdminProductHandle/Remove/RemoveNavbar";
import RemoveCategoryGrid from "../admin/pages/ProductPage/AdminProductHandle/Remove/RemoveCategoryGrid";
import ProductList from "../customer/components/Product/ProductList";
import CustomerList from "../admin/pages/CustomerPage/CustomerList";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/collection/:collection/:category",
        element: <CategoryPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/search/:search",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/verify/redirect",
        element: <Jwt />,
      },
      {
        path: "checktoken",
        element: <TokenCheck />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "my-orders/order/:orderId",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrdersPage />,
      },
      {
        path: "/admin/order/:orderId",
        element: <AdminOrderDetailePage />,
      },
      {
        path: "/admin/products",
        element: <AdminProductPage />,
      },
      {
        path: "/admin/products/add-product",
        element: <AddProduct />,
      },
      {
        path: "/admin/products/add-banner",
        element: <AddBanner />,
      },
      {
        path: "/admin/products/add-grid",
        element: <AddCategoryGrid />,
      },
      {
        path: "/admin/products/add-navbar",
        element: <AddNavbar />,
      },
      {
        path: "/admin/products/remove-products",
        element: <RemoveProducts />,
      },
      {
        path: "/admin/products/remove-banner",
        element: <RemoveBanners />,
      },
      {
        path: "/admin/products/remove-navbar",
        element: <RemoveNavbar />,
      },
      {
        path: "/admin/products/remove-grid",
        element: <RemoveCategoryGrid />,
      },
      {
        path: "/admin/customers",
        element: <CustomerList />
      }
    ],
  },
]);
export default Router;
