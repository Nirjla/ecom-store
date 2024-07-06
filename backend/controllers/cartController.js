const Cart = require('../model/Cart')

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const { itemId, quantity } = req.body;

        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            const existingCartItem = existingCart.items.find(item => item.item && item.item.toString() === itemId);

            if (existingCartItem) {
                // If the item already exists in the cart, update its quantity
                existingCartItem.quantity += quantity || 1;
            } else {
                // If the item doesn't exist in the cart, add it to the items array
                existingCart.items.push({ item: itemId, quantity: quantity || 1 });
            }


            const updatedCart = await existingCart.save();
            res.json(updatedCart);
        } else {
            // If the cart doesn't exist for the user, create a new cart with the item
            const newCart = new Cacrt({
                user: userId,
                items: [{ item: itemId, quantity: quantity || 1 }]
            });

            const savedCart = await newCart.save();
            res.json(savedCart);
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId }).populate('items.item')
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.deleteFromCart = async (req, res) => {
    try {
        // console.log("hello")
        // console.log(req.params)
        const userId = req.user.id;
        const { itemId } = req.params
        console.log("itemtodel:" + itemId)
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' })
        }
        res.json(cart)
        console.log("cartisis" + cart)
    } catch (err) {
        console.error('Error removing item from cart ', err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.updateQuantity = async (req, res) => {
    try {
        const userId = req.user.id
        // console.log(userId)
        const { itemId } = req.params
        // console.log("itemid" + itemId)
        const { quantity } = req.body
        // console.log("q" + quantity)
        const cart = await Cart.findOne({ user: userId })
        console.log(cart)
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' })
        }
        const existingCartItem = cart.items.find(item => item._id.toString() === itemId)
        if (!existingCartItem) {
            return res.status(404).json({
                message: 'Item not foound in the cart'
            })
        }
        existingCartItem.quantity = quantity
        const updatedCart = await cart.save()
        res.json(updatedCart)
    } catch (err) {
        console.error('Error updating quantity:', err)
        res.status(500).json({ message: 'Internal server error' })
    }
}