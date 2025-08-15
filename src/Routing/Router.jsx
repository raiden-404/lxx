import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout"
import HomePage from "../customer/pages/homepage/HomePage"
import ProductPage from "../customer/pages/ProductPage/ProductPage";
import CartPage from "../customer/pages/CartPage/CartPage"
import ProductListPage from "../customer/pages/ProductPage/ProductListPage"
import CategoryPage from "../customer/pages/CategoryPage/CategoryPage";
import LoginPage from "../customer/pages/LoginPage/LoginPage";
import AddProduct from "../customer/pages/Admin/AddProduct/AddProduct";
import AdminLayout from "../Layouts/AdminLayout";
import Jwt from "../reusables/Jwt";
import Logout from "../reusables/Logout";
import TokenCheck from "../reusables/TokenCheck";
import Wishlist from "../customer/pages/WishlistPage/WishlistPage";
import CheckoutPage from "../customer/pages/CheckoutPage/CheckOutPage";

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
            }
        ]
    },
    {
        path : "/seller",
        element : <AdminLayout />,
        children : [
            {
                index: true,
                element : <AddProduct />
            }
        ]
    }
])
export default Router;