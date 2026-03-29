import {Route, Routes} from "react-router-dom"

import Login from "../pages/login/UserLogin.jsx"

/* Rotas do site */
function AppRoute(){

    return(
        <div>
        <Routes>
            {/* Rota Publica */}
            <Route path="/login" element={<Login />}/>
        </Routes>
        </div>
    )
}

export default AppRoute