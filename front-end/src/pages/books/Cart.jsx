import {useContext} from "react";
import {CartContext} from "../../contexts/CartContext.jsx";
import Book from "../../Components/Book.jsx";

const Cart = () => {
   const { cart, removeFromCart } = useContext(CartContext);

   return (
       <section className="card">
           <h1 className="title">Shopping Cart</h1>

           {cart.length === 0 ? (
               <p className="text-gray-500 text-center">ไม่มีสินค้าในตะกร้า</p>
           ) : (
               cart.map((book) => (
                   <div key={book._id}>
                       <Book book={book}>
                           <button
                               className="nav-link text-red-500 hover:bg-red-200"
                               title="Remove from Cart"
                               onClick={() => removeFromCart(book._id)}
                           >
                               <i className="fa-solid fa-trash-can"></i>
                           </button>
                       </Book>
                   </div>
               ))
           )}
       </section>
   )
}


export default Cart