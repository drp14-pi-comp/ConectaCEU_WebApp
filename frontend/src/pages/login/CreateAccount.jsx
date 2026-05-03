import { useNavigate } from "react-router-dom"
import Formulario from "../../components/formRegisterGeneric/UserForm"
import Back from "../../assets/icons/arrow-left.svg?react"

import "./CreateAccount.css"


const CreateAccount = () => {

  const navigate = useNavigate()

  return (
    <div className='container-create-acount'>
      <div className="backbutton">
        <button type="back" onClick={() => navigate("/login")}>
          <Back className="icon-back"/>
        </button>
      </div>

        <Formulario/>
    </div>
  )
}

export default CreateAccount
