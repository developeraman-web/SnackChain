import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import Index from "./pages/Index";
import Layout from "./layout/Layout";
import {
  RouteAddCampus,
  RouteAddDish,
  RouteBusinessIndex,
  RouteCampusDetails,
  RouteDishDetails,
  RouteItemDetails,
  RouteOrders,
  RouteOwnerCredentials,
  RouteRegisterRestraunt,
  RouteRestaurant,
  RouteRestaurantDashboard,
  RouteRestaurantWiseOrder,
  RouteUserLogin,
  RouteUserSignUp,
  RouteViewCart,
  RouteYourMenu,
} from "./helpers/RouteNames";
import { UserSignup } from "./pages/UserSignup";
import { UserLogin } from "./pages/UserLogin";
import AuthAdminProtected from "./components/AuthAdminProtected";
import AdminLayout from "./layout/AdminLayout";
import AddCampus from "./pages/admin/AddCampus";
import CampusDetails from "./pages/admin/CampusDetails";
import BusinessIndex from "./pages/business/BusinessIndex";
import RegisterRestaurant from "./pages/business/RegisterRestaurant";
import RestaurantDashLayout from "./layout/RestaurantDashLayout";
import { OwnerCredentials } from "./pages/OwnerCredentials";
import Menu from "./pages/myrestaurant/Menu";
import AddDish from "./pages/myrestaurant/AddDish";
import Cards from "./pages/Cards";
import Details from "./pages/Details";
import DishDetails from "./pages/myrestaurant/DishDetails";
import RestaurantPage from "./pages/RestaurantPage";
import ItemDetail from "./pages/ItemDetail";
import Orders from "./pages/Orders";
import RestaurantDashboard from "./pages/myrestaurant/RestaurantDashboard";
import AllOrders from "./pages/myrestaurant/AllOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path={RouteBusinessIndex} element={<BusinessIndex />} />
          <Route
            path={RouteRegisterRestraunt}
            element={<RegisterRestaurant />}
          />
          <Route path={RouteRestaurant()} element={<RestaurantPage />} />
          <Route path={RouteItemDetails()} element={<ItemDetail />} />
          <Route path={RouteOrders} element={<Orders />} />
        </Route>

        <Route element={<RestaurantDashLayout />}>
          {/* business or restaurant dashboard setup */}
          <Route
            path={RouteRestaurantDashboard}
            element={<RestaurantDashboard />}
          />
          <Route path={RouteYourMenu} element={<Menu />} />
          <Route path={RouteAddDish} element={<AddDish />} />
          <Route path={RouteDishDetails()} element={<DishDetails />} />
          <Route path={RouteRestaurantWiseOrder} element={<AllOrders />} />
        </Route>

        <Route element={<AuthAdminProtected />}>
          <Route element={<AdminLayout />}>
            <Route path={RouteCampusDetails} element={<CampusDetails />} />
            <Route path={RouteAddCampus} element={<AddCampus />} />
          </Route>
        </Route>
        <Route path={RouteOwnerCredentials} element={<OwnerCredentials />} />
        <Route path={RouteUserSignUp} element={<UserSignup />} />
        <Route path={RouteUserLogin} element={<UserLogin />} />
        {/* <Route Index path="/" element={<Cards />} /> */}
        {/* <Route path="/details" element={<Details />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
