"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { cartReducer, initialCartState, CartState, CartItem } from "./cartReducer";

interface CartContextValue extends CartState {
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    increment: (id: string) => void;
    decrement: (id: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "aladdin-cart";

function loadCartFromStorage(): CartState {
    if (typeof window === "undefined") return initialCartState;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                items: parsed.items || [],
                totalItems: parsed.totalItems || 0,
                totalAmount: parsed.totalAmount || 0,
            };
        }
    } catch { }
    return initialCartState;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState, loadCartFromStorage);
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const addItem = useCallback(
        (item: Omit<CartItem, "quantity">) => dispatch({ type: "ADD_ITEM", payload: item }),
        []
    );
    const removeItem = useCallback(
        (id: string) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
        []
    );
    const increment = useCallback(
        (id: string) => dispatch({ type: "INCREMENT", payload: { id } }),
        []
    );
    const decrement = useCallback(
        (id: string) => dispatch({ type: "DECREMENT", payload: { id } }),
        []
    );
    const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    return (
        <CartContext.Provider
            value={{ ...state, addItem, removeItem, increment, decrement, clearCart, isCartOpen, openCart, closeCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
