// Página de criação de conta destinada aos alunos.

import Formulario from "../../components/FormRegister.jsx"

import { useNavigate } from "react-router-dom"

import "./CreateAccount.css"

// Conclusão dessa página sera após a implementação do componente formulário
const CreateAccount = () => {

  const navigate = useNavigate()

  return (
    <div className='.container-create-acount'>
      <div className="backbutton">
        <button type="back" onClick={() => navigate("/login")}>Voltar</button>
      </div>

        <Formulario/>
    </div>
  )
}

export default CreateAccount
