import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    wishListItems: [],
    couponCode: '',
    appliedCoupon: [],
    shippingMethod: 'standard',
    paymentMethod: 'card',
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

            if (itemIndex === -1) {
                state.cartItems.push({...action.payload, quantity: 1});
            } else {
                state.cartItems[itemIndex].quantity += action.payload.quantity || 1;
            }
        },
        removeItemFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.cartItems.splice(itemIndex, 1);
            }
        },
        
        updateItemQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity = Math.max(1, action.payload.newQuantity);
            }
        },

        moveToWishList: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item) {
                state.wishListItems.push(item);
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            }
        },

        moveToCart: (state, action) => {
            const item = state.wishListItems.find(item => item.id === action.payload);
            if (item) {
                state.cartItems.push(item);
                state.wishListItems = state.wishListItems.filter(item => item.id !== action.payload);
            }
        },

        applyCoupon: (state, action) => {
            if (action.payload.toLowerCase() === 'discount10') {
                state.appliedCoupon = action.payload;
            }
        },

        setShippingMethod: (state, action) => {
            state.shippingMethod = action.payload;
        },
        setPaymentMethod: (state, action) => {  
            state.paymentMethod = action.payload;
        },
        
    }
});

export const { 
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    moveToWishList,
    moveToCart,
    applyCoupon,
    setShippingMethod,
    setPaymentMethod
} = cartSlice.actions;

export default cartSlice.reducer;
