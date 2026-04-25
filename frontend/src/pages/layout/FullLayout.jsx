import { Outlet } from "react-router-dom"

import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"

import "../../index.css"

export default function FullLayout() {
  return (
    <div className="app_layout">
      <Header />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}