import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout"
import HomePage from "../customer/pages/homepage/HomePage"
import ProductPage from "../customer/pages/ProductPage/ProductPage";
import CartPage from "../customer/pages/CartPage/CartPage"
import ProductListPage from "../customer/pages/ProductPage/ProductListPage"
import CategoryPage from "../customer/pages/CategoryPage/CategoryPage";
import LoginPage from "../customer/pages/LoginPage/LoginPage";
import SearchBar from "../customer/components/navigations/SearchBar";
import Jwt from "../customer/pages/Jwt";

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
                path : "/collection/:collection/:collectionId/:category/:categoryId",
                element : <CategoryPage />
            },
            {
                path : "/product/:name/:id",
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
            }
        ]
    }
])
export default Router;