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
import AdminPrivateRoute from "../PrivateRoutes/AdminPrivateRoute";
import AgentPrivateRoute from "../PrivateRoutes/AgentPrivateRoute";
import ForbiddenPage from "../pages/extraPages/ForbiddenPage";
import NotFound from "../pages/NotFound/NotFound";
import About from "../pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/propertyDetails/:id",
        element: (
          <PrivateRoutes>
            <PropertyDetailsPage></PropertyDetailsPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "/EditPropertyDetails/:id",
        element: (
          <PrivateRoutes>
            <EditPropertyDetails></EditPropertyDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoutes>
            <PaymentSuccessPage></PaymentSuccessPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/all-properties",
        element: (
          <PrivateRoutes>
            <AllPropertiesPage></AllPropertiesPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "make-offer/:id",
        element: (
          <PrivateRoutes>
            <MakeOfferPage></MakeOfferPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "forbidden-page",
        element: <ForbiddenPage></ForbiddenPage>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoutes>
                <Profile></Profile>
              </PrivateRoutes>
            ),
          },
          {
            path: "add-property",
            element: (
              <PrivateRoutes>
                <AgentPrivateRoute>
                  <AddProperty></AddProperty>
                </AgentPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "my-properties",
            element: (
              <PrivateRoutes>
                <AgentPrivateRoute>
                  <MyProperties></MyProperties>
                </AgentPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "sold-properties",
            element: (
              <PrivateRoutes>
                <AgentPrivateRoute>
                  <SoldProperties></SoldProperties>
                </AgentPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "requests",
            element: (
              <PrivateRoutes>
                <AgentPrivateRoute>
                  <RequestedPropertys></RequestedPropertys>
                </AgentPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "manage-users",
            element: (
              <PrivateRoutes>
                <AdminPrivateRoute>
                  <ManageUsers></ManageUsers>
                </AdminPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "manage-properties",
            element: (
              <PrivateRoutes>
                <AdminPrivateRoute>
                  <ManageProperties></ManageProperties>
                </AdminPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "manage-reviews",
            element: (
              <PrivateRoutes>
                <AdminPrivateRoute>
                  <ManageReviews></ManageReviews>
                </AdminPrivateRoute>
              </PrivateRoutes>
            ),
          },
          {
            path: "wishlist",
            element: (
              <PrivateRoutes>
                <UserWishList></UserWishList>
              </PrivateRoutes>
            ),
          },
          {
            path: "bought",
            element: (
              <PrivateRoutes>
                <UserBought></UserBought>
              </PrivateRoutes>
            ),
          },
          {
            path: "reviews",
            element: (
              <PrivateRoutes>
                <UserMyReviews></UserMyReviews>
              </PrivateRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
