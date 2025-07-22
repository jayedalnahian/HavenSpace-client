import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import AddProperty from "../AgentPages/AddProperty";
import MyProperties from "../AgentPages/MyProperties";
import SoldProperties from "../AgentPages/SoldProperties";
import RequestedPropertys from "../AgentPages/RequestedPropertys";
import UserWishList from "../UserPages/UserWishList";
import UserBought from "../UserPages/UserBought";
import ManageUsers from "../AdminPages/ManageUsers";
import ManageProperties from "../AdminPages/ManageProperties";
import ManageReviews from "../AdminPages/ManageReviews";
import UserMyReviews from "../UserPages/UserMyReviews";
import PropertyDetailsPage from "../pages/PropertyDetails/PropertyDetailsPage";
import EditPropertyDetails from "../pages/PropertyDetails/EditPropertyDetails";
import AllPropertiesPage from "../pages/AllProperties/AllPropertiesPage";
import Profile from "../AgentPages/Profile";
import PaymentSuccessPage from "../pages/PropertyDetails/PaymentSuccessPage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MakeOfferPage from "../pages/MakeOfferPage/MakeOfferPage";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/propertyDetails/:id",
        element: <PrivateRoutes><PropertyDetailsPage></PropertyDetailsPage></PrivateRoutes>,
      },
      {
        path: "/EditPropertyDetails/:id",
        element: <PrivateRoutes><EditPropertyDetails></EditPropertyDetails></PrivateRoutes>,
      },
      {
        path: "/payment-success",
        element: <PrivateRoutes><PaymentSuccessPage></PaymentSuccessPage></PrivateRoutes>
      },
      {
        path: "/all-properties",
        element: <PrivateRoutes><AllPropertiesPage></AllPropertiesPage></PrivateRoutes>,
      },
      {
        path: "make-offer/:id",
        element: <PrivateRoutes><MakeOfferPage></MakeOfferPage></PrivateRoutes>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
          {
            index: true,
            element: <PrivateRoutes><Profile></Profile></PrivateRoutes>,
          },
          {
            path: "add-property",
            element: <PrivateRoutes><AddProperty></AddProperty></PrivateRoutes>,
          },
          {
            path: "my-properties",
            element: <PrivateRoutes><MyProperties></MyProperties></PrivateRoutes>,
          },
          {
            path: "sold-properties",
            element: <PrivateRoutes><SoldProperties></SoldProperties></PrivateRoutes>,
          },
          {
            path: "requests",
            element: <PrivateRoutes><RequestedPropertys></RequestedPropertys></PrivateRoutes>,
          },
          {
            path: "manage-users",
            element: <PrivateRoutes><ManageUsers></ManageUsers></PrivateRoutes>,
          },
          {
            path: "manage-properties",
            element: <PrivateRoutes><ManageProperties></ManageProperties></PrivateRoutes>,
          },
          {
            path: "manage-reviews",
            element: <PrivateRoutes><ManageReviews></ManageReviews></PrivateRoutes>,
          },
          {
            path: "wishlist",
            element: <PrivateRoutes><UserWishList></UserWishList></PrivateRoutes>,
          },
          {
            path: "bought",
            element: <PrivateRoutes><UserBought></UserBought></PrivateRoutes>,
          },
          {
            path: "reviews",
            element: <PrivateRoutes><UserMyReviews></UserMyReviews></PrivateRoutes>,
          },
        ],
      },
    ],
  },
]);

export default router;
