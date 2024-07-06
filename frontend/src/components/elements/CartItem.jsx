import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteFromCartMutation, useUpdateQuantityMutation, useGetCartItemsQuery } from "../../api/apiSlice";
import useAuth from "../../hooks/useAuth";

export default function CartItem({ item }) {
      const [deleteFromCart] = useDeleteFromCartMutation();
      const [updateQuantity] = useUpdateQuantityMutation();
      const { isAuthenticated } = useAuth();
      const { refetch } = useGetCartItemsQuery();
      const [quantity, setQuantity] = useState(item.quantity);

      const handleRemoveCart = async (itemId) => {
            try {
                  if (isAuthenticated) {
                        await deleteFromCart(itemId).unwrap();
                        toast.success("Item removed from cart");
                        refetch();
                  } else {
                        toast.error("Failed to remove item from cart");
                  }
            } catch (err) {
                  toast.error("Failed to remove item from cart");
            }
      };

      const handleUpdateQuantity = async (itemId, newQuantity) => {
            try {
                  if (isAuthenticated) {
                        await updateQuantity({ itemId, quantity: newQuantity }).unwrap();
                  toast.success("Item quantity updated");
                        setQuantity(newQuantity);
                        refetch();
                  } else {
                        toast.error("Failed to update item quantity");
                  }
            } catch (err) {
                  toast.error("Failed to update item quantity");
            }
      };

      return (
            <div>
                  <h2>{item.item.name}</h2>
                  <div className="flex space-x-4">
                        Qty
                        <button className="bg-gray-500" onClick={() => handleUpdateQuantity(item._id, quantity + 1)}>+</button>
                        <p>{quantity}</p>
                        <button className="bg-gray-500" onClick={() => handleUpdateQuantity(item._id, quantity - 1)}>-</button>
                  </div>
                  <button onClick={() => handleRemoveCart(item._id)}>Remove</button>
            </div>
      );
}
