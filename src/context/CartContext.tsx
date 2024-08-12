'use client'
import { createContext, useState, ReactNode, useContext } from "react";


interface CartItem {
    id:string,
    name: string;
    brand:string;
    currency:string,
    size:string;
    color:string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addtoCart: (item: CartItem) => void;
    removeFromCart: (name: string) => void
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}


export const CartProvider = ({ children }: { children: ReactNode }) => {

    const [cart, setCart] = useState<CartItem[]>([])

    const addtoCart = (item: CartItem) => {
        setCart((prev) => [...prev, item])
    }

    const removeFromCart = (name: string) => {
        setCart((prev) => prev.filter(item => item.name !== name))
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{ cart, addtoCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}