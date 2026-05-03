// Página genérica para visualizar os relatórios. As opções de relatório muda de acordo com o usuário.

import { Outlet } from 'react-router-dom'

function Relatorios () {
  return (
    <div>
      <h1>relatorios</h1>
      <Outlet/>
    </div>
  )
}

export default Relatorios
