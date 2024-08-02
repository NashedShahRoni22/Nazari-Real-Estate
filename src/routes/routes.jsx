import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Root from "../layouts/Root";
import Contact from "../pages/Contact";
import PropertySearch from "../pages/Property/PropertySearch";
import Team from "../pages/About/Team";
import Agencey from "../pages/About/Agencey";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[
            {
                path:"/",
                element: <Home/>
            },
            {
                path:"/contact",
                element: <Contact/>
            },
            {
                path:"/property_search",
                element: <PropertySearch/>
            },
            {
                path:"/our_team",
                element: <Team/>
            },
            {
                path:"/our_agencey",
                element: <Agencey/>
            },
        ]
    }
])