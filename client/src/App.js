import React from 'react'
import Login from './components/login/Login.js'
import Home from './components/home/Home.js'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RouteLayout'
import { RouterProvider } from 'react-router-dom'
import AdminHome from './components/admin-home/AdminHome.js'
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
          path:"login",
          element:<Login/>
        },
        {
          path: "admin-home",
          element: <AdminHome />
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