import Navbar from "./customer/components/navigations/Navbar";
import ProductPage from "./customer/pages/ProductPage/ProductPage"
import CartPage from "./customer/pages/CartPage/CartPage"

export default function App() {
  return (
    <div>
      <div className="pt-[64px]">
        <Navbar/>
      </div>
      <ProductPage />
    </div>
  )
}