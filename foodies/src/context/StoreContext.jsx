import React, { createContext, useState, useEffect } from 'react';
import { fetchFoodList } from '../service/foodService';

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Khởi tạo token từ localStorage

  const increaseQty = (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: (prev[foodId] || 0) + 1 }));
  };

  const decreaseQty = (foodId) => {
    setQuantities((prev) => ({ ...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0 }));
  };

  const removeFromCart = (foodId) => {
    setQuantities((prevQuantity) => {
      const updatedQuantities = { ...prevQuantity };
      delete updatedQuantities[foodId];
      return updatedQuantities;
    });
  };

  const contextValue = {
    foodList,
    increaseQty,
    decreaseQty,
    quantities,
    removeFromCart,
    token, // Thêm token
    setToken // Thêm setToken
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
      } catch (err) {
        console.error('Failed to load foods', err);
        setFoodList([]);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};