import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { fetchFoodList } from "../service/foodService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchFoodList();
        setFoodList(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    }
    fetchData();
  }, []);

  const contextValue = {
    foodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
