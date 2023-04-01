import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import PublicLayout from "./components/PublicLayout";
import AboutPage from "./pages/about";
import ProductsAdminPage from "./pages/admin/products";
import ContactPage from "./pages/contact";
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/notfound";
import ProductsPage from "./pages/products";
import ProductPage from "./pages/products/product";


const routes = createBrowserRouter(
  createRoutesFromElements([
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="products" element={<ProductsPage />}>
          <Route path=":productId" element={<ProductPage />} />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<ProductsAdminPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ])
);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={routes} />
    </ChakraProvider>
  );
}
