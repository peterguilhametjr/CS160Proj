import { createNewMenuRoute } from "./createNewMenu";
import { getAllRestaurantsRoute } from "./getAllRestaurants";
import { getRestaurantsMenuRoute } from "./getMenu";
import { getRestaurantsProfileRoute } from "./getRestautrantProfile";
import { getAllOffersRoute } from "./offersPage";
import { addRestaurantRoute } from "./addrestaurant";
import { updateRestaurantRoute } from "./updaterestaurant";
import { deleteRestaurantRoute } from "./deleterestaurant";
import { getUserRestaurantsByIdRoute } from "./getUserRestaurantById";
import { updateMenuRoute } from "./updateMenu";
import { getItemRoute } from "./getItem";
import { addMenuRoute } from "./addmenu";
import { deleteMenuRoute } from "./deletemenu";
import { getUserRestaurantsMenuRoute } from "./userMenu";
import { UserSignupRoute } from "./UserSignup";
import { UserLoginRoute } from "./UserLogin";
import { RestaurantUserSignupRoute } from "./RestaurantUserSignup";
import { getUserSpecificRestaurantRoute } from "./getUserSpecificRestaurant";
import { RestaurantUserLoginRoute } from "./RestaurantUserLogin";
import { getRestaurantIdRoute } from "./getrestaurantid";
import { getUserIdRoute } from "./UserSignup";
import { initializeCart } from "./UserSignup";
import { addCartRoute } from "./cart";
import { getUserCartDetailsRoute } from "./cart";
import { deleteCartRoute } from "./cart";
import { getCartQuantity } from "./cart";
import { getCartTotalPrice } from "./cart";
import { updateCartTotalPriceQuantity } from "./cart";
import { getCart } from "./cart";
import { addOrderRoute } from "./order";
import { moveToOrderRoute } from "./order";
import { deleteAllFromCart } from "./cart";
import { getUserOrdersRoute } from "./order";
import { getUserOrderDetailsRoute } from "./order";
import { getAllUsersRoute } from "./user";
import { addToWallet } from "./wallet";
import { getAllOrders } from "./driver";
import { fullfilOrder } from "./driver";
import { getItemSpecificRoute } from "./getItem";
import { addOrderHistoryRoute } from "./order";
import { addOrderHistoryDetailsRoute } from "./order";
import { getAllUserSpecificOrderHistory } from "./order";
import { getAllUserSpecificOrderHistoryDetails } from "./order";

export default [
    getAllRestaurantsRoute,
    getRestaurantsProfileRoute,
    getRestaurantsMenuRoute, 
    createNewMenuRoute, 
    getAllOffersRoute,
    addRestaurantRoute,
    updateRestaurantRoute,
    deleteRestaurantRoute,
    getUserRestaurantsByIdRoute,
    updateMenuRoute, 
    getItemRoute,
    addMenuRoute,
    deleteMenuRoute,
    getUserRestaurantsMenuRoute,
    UserSignupRoute,
    UserLoginRoute,
    RestaurantUserSignupRoute,
    getUserSpecificRestaurantRoute,
    RestaurantUserLoginRoute,
    getRestaurantIdRoute,
    getUserIdRoute,
    initializeCart,
    addCartRoute,
    getUserCartDetailsRoute,
    deleteCartRoute,
    getCartQuantity,
    getCartTotalPrice,
    updateCartTotalPriceQuantity,
    getCart,
    addOrderRoute,
    moveToOrderRoute,
    deleteAllFromCart,
    getUserOrdersRoute,
    getUserOrderDetailsRoute,
    getAllUsersRoute,
    addToWallet,
    getAllOrders,
    fullfilOrder,
    getItemSpecificRoute,
    addOrderHistoryRoute,
    addOrderHistoryDetailsRoute,
    getAllUserSpecificOrderHistory,
    getAllUserSpecificOrderHistoryDetails
];