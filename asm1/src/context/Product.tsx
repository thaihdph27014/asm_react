import { produce } from "immer";
import  { createContext, useReducer } from "react";

 export const ProductContext = createContext([]);
const initialState = {
  products: [],
};
const ProductReducer = (state: any, aciton: any) => {
  switch (aciton.type) {
    case "FETCH_ALL":
      state.products = aciton.payload;
      return;
    case "ADD":
      state.products.push(aciton.payload);
      return;
    case "UPDATE":
      const product = aciton.payload;
      state.products = state.products.map((item: any) =>
        item.id == product.id ? product:item
      );
      return;
    case "REMOVE":
      const id = aciton.payload;
      state.products = state.products.filter((item: any) => item.id !== id);
      return;
    default:
      return state;
  }
};

const ProductProvider = ({children}:any) => {
  const [state,dispatch] = useReducer(produce(ProductReducer),initialState)
  return <div>

    <ProductContext.Provider value={{state,dispatch} as any}>
      {children}
    </ProductContext.Provider>

  </div>;
};

export default ProductProvider;
