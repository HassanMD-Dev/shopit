import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productsReducer, newProductReducer, productReducer, productDetailsReducer, newReviewReducer, productReviewReducer, reviewReducer } from "./reducer/productReducer";
import { authReducer, userReducer, allUsersReducer, userDetailsReducer, forgotPasswordReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer.js";
import { newOrderReducer, allOrderReducer, myOrdersReducer , orderDetailsReducer, orderReducer } from "./reducer/orderReducer.js";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    newReview: newReviewReducer,
    product: productReducer,
    productReview: productReviewReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrderReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;