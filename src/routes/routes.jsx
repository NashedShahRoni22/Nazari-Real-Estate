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
import BlogDetails from "../pages/Blog/BlogDetails";
import BlogUpdate from "../pages/Admin/BlogUpdate";
import Appointments from "../pages/Admin/Appointments";
import AdminContacts from "../pages/Admin/AdminContacts";
import SaleRequest from "../pages/SaleRequest";
import SaleRequestAdmin from "../pages/Admin/SaleRequestAdmin";

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
        path: "/properties/:type",
        element: <PropertySearch />,
      },
      {
        path: "/property-details/:id",
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
        path: "/request-appraisal",
        element: <SaleRequest />,
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails />,
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
        path: "/admin/appointments",
        element: <Appointments />,
      },
      {
        path: "/admin/contacts",
        element: <AdminContacts />,
      },
      {
        path: "/admin/sale_requests",
        element: <SaleRequestAdmin />,
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
        path: "/admin/blog_update/:id",
        element: <BlogUpdate />,
      },
      {
        path: "/admin/add_property",
        element: <AddProperty />,
      },
      {
        path: "/admin/property_list",
        element: <PropertyList />,
      },
    ],
  },
]);
