import { AlignStartVertical, BookMinus, Grid2X2Plus, Icon, ListMinus, ListPlus, PackageMinus, PackagePlus, PenLine, SquareMinus, SquarePen, SquarePlus } from "lucide-react";
import ProductOptionCard from "../../components/ProductPage/ProductOptionCard";
const AdminProductPage = () => {
    const options = [
        {name: "Add Products", icon: <PackagePlus size={22} color="#35BD0B" />, path:"add-product", color: "green"},
        {name: "Catlog", icon: <PackageMinus size={22} color="#B30C0C" />, path: "remove-products", color: "red"},
        {name: "Add Banners", icon: <SquarePlus size={20} color="#35BD0B" />, path: "add-banner", color: "green"},
        {name: "Remove Banners", icon: <SquareMinus size={20} color="#B30C0C" />, path: "remove-banner", color: "red"},
        {name: "Add Navbar", icon: <ListPlus size={20} color="#35BD0B" />, path: "add-navbar", color: "green"},
        {name: "Remove Navbar", icon: <ListMinus size={20} color="#B30C0C" />, path: "remove-navbar", color: "red"},
        {name: "Add Grid", icon: <Grid2X2Plus size={20} color="#35BD0B" />, path: "add-grid", color: "green"},
        {name: "Remove Grid", icon: <BookMinus size={20} color="#B30C0C" />, path: "remove-grid", color: "red"},
        {name: "Arrange Grid", icon: <AlignStartVertical size={20} color="#19B9CF" />, path: "align-grid"},
        
    ]
    return (
        <div>
            {/* Contains Options */}
            <div className="flex flex-wrap justify-between gap-y-10">
                {
                    options.map((option) => (<ProductOptionCard key={option.name} option={option} />))
                }
            </div>
            {/* Contains Some Charts or something like that */}
            <div>

            </div>
        </div>
    )
}
export default AdminProductPage;