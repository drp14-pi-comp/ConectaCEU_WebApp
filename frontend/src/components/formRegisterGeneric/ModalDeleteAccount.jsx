import Trash from "../../assets/icons/trash.svg?react"

import "./ModalDeleteAccount.css"

export default function ModalDeleteAccount({isOpen, setModalOpen, handleDelete}) {

  if(isOpen){
    return (
      <div className='background-modal'>
        <div className='container-modal'>
          <h1>Deseja mesmo realizar a exclusão da sua conta?</h1>
          
          <div>
            <p>
              Sua conta ficará desativada por 2 dias, contados a partir de amanhã.
              Se mudar de ideia durante esse período, basta acessar sua conta 
              novamente para cancelar o processo de exclusão. Caso contrário, todos
              os seus dados serão removidos permanentemente e <strong>não poderão ser recuperados</strong>. 
            </p>
          </div>

          <div className="modal-box-btn"> 
            <button 
              className='btn-modal-delete' 
              type="button" 
              onClick={handleDelete}
            >
              <Trash className="icon-trash"/> Confirmar
            </button>

            <button className='btn' type="button" onClick={setModalOpen}>
              Cancelar
            </button>
          </div>

        </div>
      </div>
    )
  }

  return null
}
