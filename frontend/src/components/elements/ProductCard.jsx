import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    
    return (<>
        <div className="p-5">
            <Link to={`/items/${item._id}`}>
            <h2>{item.name}</h2>
            </Link>
            <p>Price: {item.price}</p>
            <button>Add to Cart</button>
        </div>
    </>)
}