import Navbar from "./customer/components/navigations/Navbar";
import ProductCard from "./customer/components/Product/ProductCard";
import ProductList from "./customer/components/Product/ProductList";
import HomePage from "./customer/pages/homepage/HomePage";
import ProductPage from "./customer/pages/ProductPage/ProductPage";

export default function App() {
  return (
    <div>
      <div className="pt-[64px]">
        <Navbar/>
      </div>
        <HomePage />
    </div>
  )
}