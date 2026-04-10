import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

// Roles para cada usuário. em outras palavras oq cada tipo de usuário tem poder de fazer.
const homePorTipoUsuario = {
  aluno: [
    { label: 'Meus Dados', rota: '/meus-dados'}, // dados pessoais do aluno
    { label: 'Inscrição', rota: '/inscricao'}, // cursos/atividades disponíveis
    { label: 'Minhas Inscrições', rota: '/minhas-inscricoes'}, // cursos/atividades inscritos pelo alun0; limite=3
    { label: 'Emitir Documentos', rota: '/emitir-documentos'} // emissão da grade de aulas, dados pessoais e certificados.
  ],

  professor: [
    { label: 'Consultar Alunos', rota: '/relatorio'}, // consulta dos alunos inscritos.
    { label: 'Gerenciar Aula', rota: '/gerenciar-aulas'}, // cadastro e consulta das aulas.
  ],

  secretaria: [
    { label: 'Cadastrar Aluno ou Professor', rota: '/cadastro'}, // cadastro de aluno e professor.
    { label: 'Validar Cadastros Externos', rota: '/validar-cadastros'}, // validaçao dos cadastro online.
    { label: 'Emitir Documentos', rota: '/emitir-documentos'}, //emissão da carteirinha, grade de aulas, ficha de inscrição e certificados
    { label: 'Enviar Comunicado', rota: '/comunicados'}, // envio de comunicado para alunos, coordenadores e professores
    { label: 'Relatórios', rota: '/relatorios'} // consultas dos alunos inscritos, professores, cursos/atividades e lista de presença
  ],

  coordenador: [
    { label: 'Cadastrar Curso ou Atividade', rota: '/cadastro'}, 
    { label: 'Emitir Documentos', rota: '/emitir-documentos'}, //emissão da grade de cursos/atividades
    { label: 'Enviar Comunicado', rota: '/comunicados'}, // envio de comunicado para alunos, coordenadores e professores
    { label: 'Relatórios', rota: '/relatorios'} // consultas dos alunos inscritos, professores, cursos/atividades e lista de presença
  ],

  admin: [
    { label: 'Usuários', rota: '/usuarios'}, // consulta dos usuários da coordenadoria e secretaria, podendo excluir ou bloquear.
    { label: 'Cadastrar Usuário', rota: '/cadastro'} // cadastro de um novo usuário podendo ser secretaria(o) e coordenador(a)
    
  ]
}

function Home() {
  const { user } = useAuth() 
  const navigate = useNavigate()

  const menu = homePorTipoUsuario[user?.tipo] || []

  return (
    <div className='container'>
      <h1>Bem-vindo, {user?.nome}</h1>

      <div className='content'>
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.rota)}
            className='navlink'
          >
            <h3>{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home