
"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product, CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_STATE"; payload: CartState };

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "totekafe_cart";

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newItems: CartItem[];
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id);
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      break;
    }
    case "REMOVE_ITEM":
      newItems = state.items.filter((item) => item.product.id !== action.payload);
      break;
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter((item) => item.product.id !== action.payload.id);
      } else {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;
    case "CLEAR_CART":
      newItems = [];
      break;
    case "SET_STATE":
      return action.payload;
    default:
      return state;
  }
  const { totalItems, totalPrice } = calculateTotals(newItems);
  return { items: newItems, totalItems, totalPrice };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart && parsedCart.items) {
          const { totalItems, totalPrice } = calculateTotals(parsedCart.items);
          dispatch({ type: "SET_STATE", payload: { ...parsedCart, totalItems, totalPrice } });
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [state.items]);

  const addItem = (product: Product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateItemQuantity = (id: string, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return React.createElement(CartContext.Provider, {
    value: { ...state, addItem, removeItem, updateItemQuantity, clearCart },
    children: children,
  });
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
