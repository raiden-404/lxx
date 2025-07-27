import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../Layouts/UserLayout"
import HomePage from "../customer/pages/homepage/HomePage"
import ProductPage from "../customer/pages/ProductPage/ProductPage";
import CartPage from "../customer/pages/CartPage/CartPage"
import ProductListPage from "../customer/pages/ProductPage/ProductListPage"
import CategoryPage from "../customer/pages/CategoryPage/CategoryPage";

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
                path : "/collection/:name/:id",
                element : <CategoryPage />
            },
            {
                path : "/product/:name/:id",
                element : <ProductPage />
            },
            {
                path : "/category/:name/:id",
                element : <ProductListPage />
            },
            {
                path : "/cart",
                element : <CartPage />
            }
        ]
    }
])
export default Router;