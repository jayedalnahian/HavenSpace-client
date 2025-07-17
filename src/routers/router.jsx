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
import ReportedProperties from "../AdminPages/ReportedProperties";
import AdvertiseProperties from "../AdminPages/AdvertiseProperties";
import UserMyReviews from "../UserPages/UserMyReviews";
import PropertyDetailsPage from "../pages/PropertyDetails/PropertyDetailsPage";
import EditPropertyDetails from "../pages/PropertyDetails/EditPropertyDetails";
import AllPropertiesPage from "../pages/AllProperties/AllPropertiesPage";
import Profile from "../AgentPages/Profile";
import PaymentSuccessPage from "../pages/PropertyDetails/PaymentSuccessPage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MakeOfferPage from "../pages/MakeOfferPage/MakeOfferPage";

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
        element: <PropertyDetailsPage></PropertyDetailsPage>,
      },
      {
        path: "/EditPropertyDetails/:id",
        element: <EditPropertyDetails></EditPropertyDetails>,
      },
      {
        path: "/payment-success/:id",
        element: <PaymentSuccessPage></PaymentSuccessPage>
      },
      {
        path: "/all-properties",
        element: <AllPropertiesPage></AllPropertiesPage>,
      },
      {
        path: "make-offer/:id",
        element: <MakeOfferPage></MakeOfferPage>,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          {
            index: true,
            element: <Profile></Profile>,
          },
          {
            path: "add-property",
            element: <AddProperty></AddProperty>,
          },
          {
            path: "my-properties",
            element: <MyProperties></MyProperties>,
          },
          {
            path: "sold-properties",
            element: <SoldProperties></SoldProperties>,
          },
          {
            path: "requests",
            element: <RequestedPropertys></RequestedPropertys>,
          },
          {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>,
          },
          {
            path: "manage-properties",
            element: <ManageProperties></ManageProperties>,
          },
          {
            path: "manage-reviews",
            element: <ManageReviews></ManageReviews>,
          },
          {
            path: "advertise-properties",
            element: <AdvertiseProperties></AdvertiseProperties>,
          },
          {
            path: "reported-properties",
            element: <ReportedProperties></ReportedProperties>,
          },
          {
            path: "wishlist",
            element: <UserWishList></UserWishList>,
          },
          {
            path: "bought",
            element: <UserBought></UserBought>,
          },
          {
            path: "reviews",
            element: <UserMyReviews></UserMyReviews>,
          },
        ],
      },
    ],
  },
]);

export default router;
