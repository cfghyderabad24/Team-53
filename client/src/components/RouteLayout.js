import React from 'react'
import NavBar from './navBar/NavBar'
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default RootLayout