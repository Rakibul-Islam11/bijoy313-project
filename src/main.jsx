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
import MobileMenuProvider from './all-components/all-contexts/MobileMenuContext.jsx';

import MyProfile from './all-components/my-profile-page/MyProfile.jsx';
import EditProfileForm from './all-components/my-profile-page/EditProfileForm.jsx';
import NameChange from './all-components/my-profile-page/NameChage.jsx';
import DocumentNID from './all-components/my-profile-page/DocumentNID.jsx';
import Address from './all-components/my-profile-page/Address.jsx';

import ProductUpload from './all-components/product-upload-form/ProductUpload.jsx';
import AllProducts from './all-components/all-products-page/AllProducts.jsx';
import ProductDetails from './all-components/Product-Details-page/ProductDetails.jsx';
import Dashboard from './all-components/user-dashboard/Dashboard.jsx';
import CartSidebar from './all-components/cart-compo/CartSidebar.jsx';
import ActiveJobs from './all-components/user-dashboard/active-jobs/ActiveJobs.jsx';
import InstagramMarketingDetails from './all-components/user-dashboard/active-jobs/InstagramMarketingDetails.jsx';
import GmailMarketingDetails from './all-components/user-dashboard/active-jobs/GmailMarketingDetails.jsx';
import WhatsAppMarketingDetails from './all-components/user-dashboard/active-jobs/WhatsAppMarketingDetails.jsx';
import FacebookMarketingDetails from './all-components/user-dashboard/active-jobs/FacebookMarketingDetails.jsx';
import OnlineShopDetails from './all-components/online-shop-page/OnlineShopDetails.jsx';
import Setting from './all-components/setting-page/Setting.jsx';
import FavouriteProducts from './all-components/favourite-products-page/FavouriteProducts.jsx';
import Checkout from './all-components/checkout-page/Checkout.jsx';
import MicroJobs from './all-components/business-card/microjobs-page/MicroJobs.jsx';
import CheckoutInfo from './all-components/checkout-info-page/CheckoutInfo.jsx';
import AdminDashboard from './all-components/admin-all-pages/AdminDashboard.jsx';
import PrivateAdminRoute from './all-components/admin-all-pages/PrivateAdminRoute.jsx';
import AdminLayout from './all-components/admin-all-pages/AdminLayout.jsx';
import AdminLogin from './all-components/admin-all-pages/AdminLogin.jsx';
import AccessDenied from './all-components/admin-all-pages/AccessDenied.jsx';
import ActiveJobReport from './all-components/admin-all-pages/ActiveJobReport.jsx';
import Demo from './all-components/admin-all-pages/Demo.jsx';
import ActiveJobProvider from './all-components/all-contexts/ActiveJobContext.jsx';
import VerifyAlertPage from './all-components/paid-vierify-now/VerifyAlertPage.jsx';
import PaymentPaidMemberLandng from './all-components/paid-vierify-now/PaymentPaidMemberLandng.jsx';
import VerificationPopup from './all-components/verification-popup/VerificationPopup';
import VerifyMemberManual from './all-components/admin-all-pages/VerifyMemberManual.jsx';
import GetWork from './all-components/admin-all-pages/GetWork.jsx';
import BalanceShow from './all-components/admin-all-pages/BalanceShow.jsx';


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
        element: <EditProfileForm></EditProfileForm>
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
        element: <AllProducts></AllProducts>
      },
      {
        path: '/favourite-products',
        element: <FavouriteProducts></FavouriteProducts>
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
      },
      {
        path: '/online-shop',
        element: <OnlineShopDetails></OnlineShopDetails>
      },
      {
        path: '/active-jobs',
        element: <ActiveJobs></ActiveJobs>
      },
      {
        path: '/active-jobs/instagram',
        element: <InstagramMarketingDetails></InstagramMarketingDetails>
      },
      {
        path: '/active-jobs/gmail',
        element: <GmailMarketingDetails></GmailMarketingDetails>
      },
      {
        path: '/active-jobs/whatsapp',
        element: <WhatsAppMarketingDetails></WhatsAppMarketingDetails>
      },
      {
        path: '/active-jobs/facebook',
        element: <FacebookMarketingDetails></FacebookMarketingDetails>
      },
      {
        path: '/settings',
        element: <Setting></Setting>
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>
      },
      {
        path: '/micro-job',
        element: <MicroJobs></MicroJobs>
      },
      {
        path: '/checkout-info',
        element: <CheckoutInfo></CheckoutInfo>
      },
      {
        path: '/verify-alert',
        element: <VerifyAlertPage></VerifyAlertPage>
      },
      {
        path: '/payment-paid',
        element: <PaymentPaidMemberLandng></PaymentPaidMemberLandng>
      },
      {
        path: '/admin',
        element: <AdminLogin></AdminLogin>
      },
      {
        path: "/not-authorized",
        element: <AccessDenied></AccessDenied>
      },
      {
        path: '/oo',
        element: <GetWork></GetWork>
      },
      {
        path: '/bal',
        element: <BalanceShow></BalanceShow>
      },

      // In your main routes configuration
      {
        path: '/admin-panel',
        element: (
          <PrivateAdminRoute>
            <AdminLayout />
          </PrivateAdminRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboard />
          },
          {
            path: 'dashboard',
            element: <AdminDashboard />
          },
          {
            path: "active-job",
            element: <ActiveJobReport></ActiveJobReport>
          },

          {
            path: 'users',
            element: <Demo></Demo>
          },
          {
            path: 'verify-member',
            element: <VerifyMemberManual></VerifyMemberManual>
          }

        ]
      }


    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ActiveJobProvider>
        <MobileMenuProvider>

          <RouterProvider router={routes} />

        </MobileMenuProvider>
      </ActiveJobProvider>
    </AuthContextProvider>
  </StrictMode>
);
