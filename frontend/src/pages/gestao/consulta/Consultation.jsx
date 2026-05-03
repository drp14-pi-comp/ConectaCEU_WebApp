// Página genérica para todas as consultas(aulas, alunos, etc).

import { Outlet } from 'react-router-dom'

function Consulta () {
  return (
    <div>
      <h1>Consulta</h1>
      <Outlet/>
    </div>
  )
}

export default Consulta
