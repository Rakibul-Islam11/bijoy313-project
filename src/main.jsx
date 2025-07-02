import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './all-components/home-page/Home.jsx'
import SignInUp from './all-components/popup-sign&up/SignInUp.jsx'
import SignIn from './all-components/popup-sign&up/SignIn.jsx'
import AuthContextProvider from './all-components/auth-porvider-context/AuthContext.jsx'
import PasswordReset from './all-components/forgot-pass-page/PasswordReset.jsx'

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
        element: <SignInUp></SignInUp>
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>
      },
      {
        path: "/password-reset",
        element: <PasswordReset></PasswordReset>
      }
      

    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>,
)
