import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import UserProvider from "./contexts/UserContext.jsx";
import BookProvider from "./contexts/BookContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CartProvider>
            <BookProvider>
                <UserProvider>
                    <App/>
                </UserProvider>
            </BookProvider>
        </CartProvider>
    </StrictMode>,
)
