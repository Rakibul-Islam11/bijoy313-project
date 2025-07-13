import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './all-components/home-page/Home.jsx';
import SignInUp from './all-components/popup-sign&up/SignInUp.jsx';
import SignIn from './all-components/popup-sign&up/SignIn.jsx';
import AuthContextProvider from './all-components/auth-porvider-context/AuthContext.jsx';
import PasswordReset from './all-components/forgot-pass-page/PasswordReset.jsx';
import MobileMenuProvider from './all-contexts/MobileMenuContext.jsx';
import VerificationPopup from './verification-popup/VerificationPopup.jsx';
import MyProfile from './all-components/my-profile-page/MyProfile.jsx';
import EditProfileForm from './all-components/my-profile-page/EditProfileForm.jsx';
import NameChange from './all-components/my-profile-page/NameChage.jsx';
import DocumentNID from './all-components/my-profile-page/DocumentNID.jsx';
import Address from './all-components/my-profile-page/Address.jsx';
import ProductHeadMarque from './all-components/product-marque/ProductHeadMarque.jsx';
import ProductUpload from './all-components/product-upload-form/ProductUpload.jsx';
import AllProducts from './all-components/all-products-page/AllProducts.jsx';
import ProductDetails from './all-components/Product-Details-page/ProductDetails.jsx';
import Dashboard from './all-components/user-dashboard/Dashboard.jsx';
import CartSidebar from './all-components/cart-compo/CartSidebar.jsx';




const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: "/pop-up-sign",
        element: <SignInUp />
      },
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/password-reset",
        element: <PasswordReset />
      },
      {
        path: "/verification-pop",
        element: <VerificationPopup></VerificationPopup>
      },
      {
        path: "/my-profile",
        element: <MyProfile></MyProfile>
      },
      {
        path: '/edit-prop',
        element : <EditProfileForm></EditProfileForm>
      },
      {
        path: "/name-cgange",
        element: <NameChange></NameChange>
      },
      {
        path: "/nid",
        element: <DocumentNID></DocumentNID>
      },
      {

        path: '/addrss',
        element: <Address></Address>
      },
      {
        path: '/pro-up',
        element: <ProductUpload></ProductUpload>
      },
      {
        path: '/all-products',
        element : <AllProducts></AllProducts>
      },
      {
        path: '/product/:productId',
        element: <ProductDetails></ProductDetails>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: '/cart-sidebar',
        element: <CartSidebar></CartSidebar>
      }
      
      
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MobileMenuProvider> 
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
    </MobileMenuProvider>
  </StrictMode>
);
