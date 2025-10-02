import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import CreateUrlPage from "@/pages/CreateUrlPage";
import UrlListPage from "@/pages/UrlListPage";
import UrlDetailsPage from "@/pages/UrlDetailsPage";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true, // Default route
        element: <Navigate to="/urls" replace />,
      },
      {
        path: "/urls",
        element: <UrlListPage />,
      },
      {
        path: "/create",
        element: <CreateUrlPage />,
      },
      {
        path: "/urls/:id",
        element: <UrlDetailsPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <Navigate to="/urls" replace />,
  },
]);

export default router;

/* 
TODO: When an app has many routes, it's advisable to use lazy loading to dynamically load the routes. 
This is particularly useful for routes that are resource-intensive (e.g., those with graphics, maps, etc.), 
for infrequently visited or less important routes, for situations with slow internet connections, 
or on devices with limited resources, etc.
*/
