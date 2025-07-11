import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AgentLayout from "../layouts/AgentLayout/AgentLayout";
import AgentProfile from "../AgentPages/AgentProfile";
import AddProperty from "../AgentPages/AddProperty";
import MyProperties from "../AgentPages/MyProperties";
import SoldProperties from "../AgentPages/SoldProperties";
import RequestedProperties from "../AgentPages/RequestedProperties";
import UserLaout from "../layouts/UserLayout/UserLaout";
import UserProfile from "../UserPages/UserProfile";
import UserWishList from "../UserPages/UserWishList";
import UserBought from "../UserPages/UserBought";
import AdminProfile from "../AdminPages/AdminProfile";
import ManageUsers from "../AdminPages/ManageUsers";
import ManageProperties from "../AdminPages/ManageProperties";
import ManageReviews from "../AdminPages/ManageReviews";
import ReportedProperties from "../AdminPages/ReportedProperties";
import AdvertiseProperties from '../AdminPages/AdvertiseProperties'
import UserMyReviews from "../UserPages/UserMyReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/dashboard",
        element: <DashboardLayout></DashboardLayout>,
        children: [
          
          {
            path: "agent",
            element: <AgentLayout></AgentLayout>,
            children:[
              {
                index: true,
                path: 'profile',
                element: <AgentProfile></AgentProfile>
              },
              {
                path: "add-property",
                element: <AddProperty></AddProperty>
              },
              {
                path: "my-properties",
                element: <MyProperties></MyProperties>
              },
              {
                path: "sold-properties",
                element: <SoldProperties></SoldProperties>
              },
              {
                path: "requests",
                element: <RequestedProperties></RequestedProperties>
              }
            ]
          },
          {
            path: "admin",
            element: <AgentLayout></AgentLayout>,
            children:[
              {
                index: true,
                path: 'profile',
                element: <AdminProfile></AdminProfile>
              },
              {
                path: "manage-users",
                element: <ManageUsers></ManageUsers>
              },
              {
                path: "manage-properties",
                element: <ManageProperties></ManageProperties>
              },
              {
                path: "manage-reviews",
                element: <ManageReviews></ManageReviews>
              },
              {
                path: "advertise-properties",
                element: <AdvertiseProperties></AdvertiseProperties>
              },
              {
                path: "reported-properties",
                element: <ReportedProperties></ReportedProperties>
              }
            ]
          },
          {
            path: "user",
            element: <UserLaout></UserLaout>,
            children:[
              {
                index: true,
                path: 'profile',
                element: <UserProfile></UserProfile>
              },
              {
                path: "wishlist",
                element: <UserWishList></UserWishList>
              },
              {
                path: "bought",
                element: <UserBought></UserBought>
              },
              {
                path: "reviews",
                element: <UserMyReviews></UserMyReviews>
              },
            ]
          },
          
        ],
      },
    ],
  },
]);

export default router;
