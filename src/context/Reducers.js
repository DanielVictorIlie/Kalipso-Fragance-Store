
export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cart: [...state.cart, { ...action.payload.cart, ml: action.payload.ml, price: action.payload.price, id: action.payload.id, qty: 1, inStock: action.payload.inStock }] };
        case 'ADD_QTY_WHEN_ADD_TO_CART':
            return {
                ...state,
                qty: action.payload.qty, inStock: action.payload.inStock
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.slice().filter(c => (c.id !== action.payload.id))
            };
        case 'ADD_STOCK_WHEN_REMOVE':
            return {
                ...state,
                qty: action.payload.qty, inStock: action.payload.inStock
            };
        case 'CHANGE_CART_QTY':
            return {
                ...state, cart: state.cart.filter(c =>
                    c.name === action.payload.name && c.ml === action.payload.ml ? (c.qty = action.payload.qty) : c.qty)
            };
        case 'INITIALIZE_CART':
            return action.payload;
        default:
            return state;
    }
}

export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SORT_BY_PRICE':
            return { ...state, sort: action.payload };
        case 'FILTER_BY_GENDRE':
            return { ...state, byGendre: action.payload };
        case 'FILTER_BY_RATING':
            return { ...state, byRating: action.payload };
        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload };
        case 'CLEAR_FILTERS':
            return {
                byGendre: '',
                byRating: 0,
                searchQuery: '',
            }
        default:
            return state
    }
}