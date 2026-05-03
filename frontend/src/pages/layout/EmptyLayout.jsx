import { Outlet } from "react-router-dom"

import "../../index.css"

export default function FullLayout() {
  return (
    <div className="app_layout">
      <div className="content">
        <Outlet />
      </div> 
    </div>
  )
}