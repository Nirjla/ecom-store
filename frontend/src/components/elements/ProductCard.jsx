import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../../api/apiSlice";
import { getTokenFromLocalStorage } from "../../utils/utils";
import useAuth from "../../hooks/useAuth";
import PrimaryButton from "../reusables/buttons/PrimaryButton";

export default function ProductCard({ item }) {
    const token = getTokenFromLocalStorage()
    console.log(`Token ${token}`)
    const [addToCart] = useAddToCartMutation()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const handleAddToCart = async () => {
        try {
            if (!isAuthenticated) {
                toast.warn("Please login first", {
                    onClose: () => {
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                    }
                });
                return; // Return early if not authenticated
            }
            await addToCart({ itemId: item._id, quantity: 1 }).unwrap()
            // console.log(response)
            toast.success("Item added to cart");
        } catch (err) {
            toast.error("Failed to add item to cart");
        }
    };

    return (<>
        <div className="border-solid border-2 border-gray-200 rounded-lg  p-3 space-y-3">
            <Link to={`/items/${item._id}`}>
                <h2 className="">{item.name}</h2>
            </Link>
            <p>Price: {item.price}</p>
            <PrimaryButton name="Add to Cart" onClick={handleAddToCart} />
        </div>
    </>)
}