import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useAuth } from "../../hooks/useAuth";
import { useAddToCartMutation } from "../../api/apiSlice";
import { getTokenFromLocalStorage } from "../../utils/utils";

export default function ProductCard({ item }) {
    const token = getTokenFromLocalStorage()
    console.log(`Token ${token}`)
    const [addToCart] = useAddToCartMutation()
    const navigate = useNavigate()
    // const { isAuthenticated } = useAuth()
    // const handleAddToCart = async () => {
    //     try {
    //         if (!isAuthenticated) {
    //             toast.warn("Please login first", {
    //                 onClose: () => {
    //                     setTimeout(() => {
    //                         navigate('/login');
    //                     }, 2000);
    //                 }
    //             });
    //             return; // Return early if not authenticated
    //         }
    //         await addToCart({ itemId: item._id, quantity: 1 }).unwrap()
    //         // console.log(response)
    //         toast.success("Item added to cart");
    //     } catch (err) {
    //         toast.error("Failed to add item to cart");
    //     }
    // };

    return (<>
        <div className="bg-gray-300 p-3">
            <Link to={`/items/${item._id}`}>
                <h2>{item.name}</h2>
            </Link>
            <p>Price: {item.price}</p>
            {/* <button onClick={handleAddToCart}>Add to Cart</button> */}

        </div>
    </>)
}