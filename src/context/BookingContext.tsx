"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  serviceId: string;
  serviceName: string;
  subService: string;
  capacity?: string;
  amc?: string;
  price: number;
  image: string;
  duration: string;
  rating: number;
  reviews: number;
  quantity: number;
  discountedPrice: number;
  originalPrice: number;

  service_category_id?: number;
  serviceCategoryId?: number;
  service_id?: number;
}


export interface BookingContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  selectedAddress: any | null;
  setSelectedAddress: (address: any) => void;
  acceptedTC: boolean;
  setAcceptedTC: (value: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [acceptedTC, setAcceptedTC] = useState(false);

  // const [cartItems, setCartItems] = useState<any[]>([]);
const [cartLoaded, setCartLoaded] = useState(false);
useEffect(() => {
  const savedCart = localStorage.getItem("cartItems");

  if (savedCart) {
    setCartItems(JSON.parse(savedCart));
  }

  setCartLoaded(true);
}, []);

useEffect(() => {
  if (cartLoaded) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}, [cartItems, cartLoaded]);

 const addToCart = (service: any) => {
   setCartItems((prev: any[]) => {
     const existingItem = prev.find((item) => item.id === service.id);

     // IF ITEM ALREADY EXISTS -> increase quantity
     if (existingItem) {
       return prev.map((item) =>
         item.id === service.id
           ? {
               ...item,
               quantity: item.quantity + 1,
             }
           : item,
       );
     }

     // NEW ITEM
     return [
       ...prev,
       {
         ...service,
         quantity: 1,
       },
     ];
   });
 };

const removeFromCart = (id: number | string) => {
  setCartItems((prev: any[]) =>
    prev
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0),
  );
};

  const clearCart = () => {
    setCartItems([]);
  };

  const value: BookingContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    selectedAddress,
    setSelectedAddress,
    acceptedTC,
    setAcceptedTC,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = React.useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
