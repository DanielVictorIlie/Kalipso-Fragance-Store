import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

const getInitialState = () => {
    let localCartData = localStorage.getItem('cartItems');
    return (localCartData === []) ? [] : JSON.parse(localCartData);
}
const initialState = {
    products: [],
    cart: getInitialState()
};
const Context = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, initialState)

    useEffect(() => {
        fetch('https://json-server-vercel-2-five.vercel.app/deposit')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: 'INITIALIZE_CART',
                    payload: {
                        ...initialState,
                        products: data,
                    }
                });
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cart))
    }, [state.cart])

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: true,
        byGendre: '',
        byRating: 0,
        searchQuery: '',
    })

    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>
    )
}

export default Context;
export const CartState = () => {
    return useContext(Cart);
}