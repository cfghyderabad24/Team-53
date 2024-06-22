import React from 'react'
import Login from './components/login/Login'
import Home from './components/home/Home'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RouteLayout'
import Register from './components/register/Register'
import { RouterProvider } from 'react-router-dom'
function App() {
  const router=createBrowserRouter([
    {
      path:"",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:"Register",
          element:<Register/>
        },
        {
          path:"login",
          element:<Login/>
        }
      ]
    }
  ])
  return (
    <div>
     <div>
      <RouterProvider router={router} />
    </div>
    </div>
  )
}

export default App