export const RouteUserSignUp = "/user-signup";
export const RouteUserLogin = "/user-login";
export const RouteIndex = "/";
export const RouteAddCampus = "/add/campus";
export const RouteCampusDetails = "/campus";
export const RouteBusinessIndex = "/business";
export const RouteRegisterRestraunt = "/register-restraunt";
export const RouteRestaurantDashboard = "/my-restaurant-dashboard";
export const RouteOwnerCredentials = "/my-restaurant";
export const RouteYourMenu = "/your-menu";
export const RouteAddDish = "/add-dish";
export const RouteDishDetails = (id) => {
  if (!id) {
    return "/dish/:id";
  } else {
    return `/dish/${id}`;
  }
};
export const RouteItemDetails = (restaurantid, id) => {
  if (!id) {
    return "/:restaurantid/item/:id";
  } else {
    return `/${restaurantid}/item/${id}`;
  }
};
export const RouteRestaurant = (restaurantid) => {
  if (!restaurantid) {
    return "/restaurant/:restaurantid";
  } else {
    return `/restaurant/${restaurantid}`;
  }
};
export const RouteViewCart = "/my-cart";
