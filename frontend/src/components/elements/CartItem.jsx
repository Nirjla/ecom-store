import { toast } from "react-toastify";
import { useDeleteFromCartMutation } from "../../api/apiSlice";
import useAuth from "../../hooks/useAuth";

export default function CartItem({ item }) {
      const [deleteFromCart] = useDeleteFromCartMutation();
      const { isAuthenticated } = useAuth();

      const handleRemoveCart = async (itemId) => {
            try {
                  if (isAuthenticated) {
                        console.log("Item:" + itemId)
                        const res = await deleteFromCart(itemId).unwrap();
                        if (res) {
                              console.log("deleetd" + res)
                        }
                        toast.success("Item removed from cart");
                  } else {
                        toast.error("Failed to remove item from cart");
                  }
            } catch (err) {
                  toast.error("Failed to remove item from cart");
            }
      };

      return (
            <div>
                  {item.item._id}
                  <h2>{item.item.name}</h2>
                  <div className="flex space-x-4">
                        Qty
                        <button className="bg-gray-500">+</button>
                        <p>1</p>
                        <button className="bg-gray-500">-</button>
                  </div>
                  <button onClick={() => handleRemoveCart(item._id)}>Remove</button>
            </div>
      );
}
