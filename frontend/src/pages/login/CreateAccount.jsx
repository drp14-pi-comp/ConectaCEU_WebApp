import { useNavigate } from "react-router-dom"
import Formulario from "../../components/UserForm.jsx"

import "./CreateAccount.css"


const CreateAccount = () => {

  const navigate = useNavigate()

  return (
    <div className='container-create-acount'>
      <div className="backbutton">
        <button type="back" onClick={() => navigate("/login")}>Voltar</button>
      </div>

        <Formulario/>
    </div>
  )
}

export default CreateAccount
