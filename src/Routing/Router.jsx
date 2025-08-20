import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout"
import HomePage from "../customer/pages/homepage/HomePage"
import ProductPage from "../customer/pages/ProductPage/ProductPage";
import CartPage from "../customer/pages/CartPage/CartPage"
import ProductListPage from "../customer/pages/ProductPage/ProductListPage"
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
import Chart from "../dummydata/chart";

const Router = createBrowserRouter([
    {
        path : "/",
        element : <UserLayout />,
        children : [
            {
                index: true,
                element : <HomePage />
            },
            {
                path : "/collection/:collection/:category",
                element : <CategoryPage />
            },
            {
                path : "/product/:id",
                element : <ProductPage />
            },
            {
                path : "/category/:category/:categoryId",
                element : <ProductListPage />
            },
            {
                path : "/cart",
                element : <CartPage />
            },
            {
                path : "/login",
                element : <LoginPage />
            },
            {
                path : "/login-success",
                element : <CartPage />
            },
            {
                path : "verify/redirect",
                element : <Jwt />
            },
            {
                path : "checktoken",
                element : <TokenCheck />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "wishlist",
                element: <Wishlist />
            },
            {
                path: "checkout",
                element: <CheckoutPage />
            },
            {
                path: "my-orders",
                element: <MyOrdersPage />
            },
            {
                path: "my-orders/order/:orderId",
                element: <OrderPage />
            }
        ]
    },
    {
        path : "/admin",
        element : <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminDashboard/>
            },
            {
                path: "/admin/orders",
                element: <AdminOrdersPage />
            },
            {
                path: "/admin/order/:orderId",
                element: <AdminOrderDetailePage />
            },
            {
                path: "/admin/test-features",
                element: <Chart />
            }
        ]
        
    }
])
export default Router;