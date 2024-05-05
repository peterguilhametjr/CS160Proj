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
import { getUserCartRoute } from "./cart";
import { deleteCartRoute } from "./cart";

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
    getUserCartRoute,
    deleteCartRoute
];