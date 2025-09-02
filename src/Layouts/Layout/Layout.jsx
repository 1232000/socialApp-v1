import React from 'react'
import AppNavbar from '../../Components/Navbar/AppNavbar'
import { Outlet } from 'react-router-dom'
import AppFooter from '../../Components/Footer/AppFooter'

export default function Layout() {
  return (
    <>
        <AppNavbar/>
        <div className="min-h-page pt-20 text-black bg-blue-100 dark:bg-gray-900 dark:text-gray-900">
          <Outlet/>
        </div>
        <AppFooter/>
    </>
  )
}
