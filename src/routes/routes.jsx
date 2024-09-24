import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Contact from "../pages/Contact";
import PropertySearch from "../pages/Property/PropertySearch";
import Team from "../pages/About/Team";
import Agencey from "../pages/About/Agencey";
import PropertyDetails from "../pages/Property/PropertyDetails";
import Blog from "../pages/Blog/Blog";
import Admin from "../layouts/Admin";
import Login from "../pages/Login";
import PrivateRoute from "../shared/PrivateRoute";
import Agents from "../pages/Admin/Agents";
import AdminBlog from "../pages/Admin/AdminBlog";
import UpdateAgent from "../pages/Admin/UpdateAgent";
import AddProperty from "../pages/Admin/AddProperty";
import PropertyList from "../pages/Admin/PropertyList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/property-search",
        element: <PropertySearch />,
      },
      {
        path: "/property_details/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/our-team",
        element: <Team />,
      },
      {
        path: "/our-agencey",
        element: <Agencey />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Agents />,
      },
      {
        path: "/admin/agnet_update/:id",
        element: <UpdateAgent />,
      },
      {
        path: "/admin/blogs",
        element: <AdminBlog />,
      },
      {
        path: "/admin/add_property",
        element: <AddProperty />,
      },
      {
        path: "/admin/property_list",
        element: <PropertyList />,
      },
    //   {
    //     path: "/admin/manage_service",
    //     element: <GetService />,
    //   },
    //   {
    //     path: "/admin/update_service/:slug",
    //     element: <UpdateService />,
    //   },
    //   {
    //     path: "/admin/contact_message",
    //     element: <ContactMessage />,
    //   },
    ],
  },
]);
