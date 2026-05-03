import {Route, Routes} from "react-router-dom"

//Layout para as rotas
import FullLayout from "../pages/layout/FullLayout.jsx"
import EmptyLayout from "../pages/layout/EmptyLayout.jsx"

//Rotas públicas
import UserLogin from "../pages/login/UserLogin.jsx"
import CreateAccount from "../pages/login/CreateAccount.jsx"
import RecoverPassword from "../pages/login/RecoverPassword.jsx"
import ResetPassword from "../pages/login/ResetPassword.jsx"

import NotFound from '../pages/NotFound.jsx'
import TermosUso from '../pages/TermsUse.jsx'
import PoliticaPrivacidade from '../pages/PrivacyPolicy.jsx'

//Rotas privadas
import Home from '../pages/Home.jsx'

// Aluno
import Inscricao from '../pages/aluno/EnrollmentCourses.jsx'
import MeusDados from '../pages/aluno/MyData.jsx'
import MinhasInscricoes from '../pages/aluno/MyCourses.jsx'

// Professor
import Chamada from '../pages/professor/RollCall.jsx'
import GerenciarAulas from '../pages/professor/ManageClass.jsx'

// Gestão
import RegistrarUsuario from '../pages/gestao/RegisterUsers.jsx'
import Comunicados from '../pages/gestao/Communication.jsx'
import EmitirDocumentosAluno from '../pages/gestao/IssueDocuments.jsx'

// Relatórios
import Relatorios from '../pages/gestao/relatorio/Report.jsx'
import RelatorioAlunosCursos from '../pages/gestao/relatorio/StudentPerCourse.jsx'
import RelatorioVagas from '../pages/gestao/relatorio/Vacancies.jsx'

// Consultas
import Consultas from '../pages/gestao/consulta/Consultation.jsx'
import ConsultarAluno from '../pages/gestao/consulta/Student.jsx'
import ConsultarProfessor from '../pages/gestao/consulta/Teacher.jsx'
import ConsultaCurso from '../pages/gestao/consulta/Courses.jsx'
import ConsultaAula from '../pages/gestao/consulta/Class.jsx'

// Admin
import GerenciarUsuarios from '../pages/admin/ManageUsers.jsx'

// Secreataria
import ValidarCadastro from '../pages/gestao/secretaria/ValidateRegistration.jsx'

// Coordenação
import CadastroCursos from "../pages/gestao/coordenação/RegisterCourses"

//Proteção das rotas
import PrivateRoute from "./PrivateRoutes.jsx"
import RoleRoute from "./RouleRoute.jsx"


function AppRoute(){


  return (
    <div>
      <Routes>
          {/* Rotas Publicas */}
        <Route element={<EmptyLayout />}>  
          <Route path="*" element={<NotFound />}/>
        </Route>

        <Route element={<FullLayout/>}>
          <Route path="/login" element={<UserLogin />}/>
          <Route path="/criar-conta" element={<CreateAccount />}/>
          <Route path="/recuperar-senha" element={<RecoverPassword />}/>
          <Route path="/redefinir-senha" element={<ResetPassword />}/>
          <Route path="/termos-de-uso" element={<TermosUso />}/>
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />}/>


          {/* Rotas Privadas */}
          <Route element={<PrivateRoute />}>

            <Route path="/"element={<Home/>}/>
            
            {/* admin */}
            <Route
              path="/usuarios"
              element={
                <RoleRoute roles={["admin"]}>
                  <GerenciarUsuarios />
                </RoleRoute>
              }
            />

            {/* Cadastro de todos os tipos de usuário */}
            <Route
              path="/cadastrar-usuario"
              element={
                <RoleRoute roles={["admin", "secretaria", "coordenador"]}>
                  <RegistrarUsuario />
                </RoleRoute>
              }
            />

            <Route
              path="/comunicados"
              element={
                <RoleRoute roles={["secretaria", "coordenador"]}>
                  <Comunicados />
                </RoleRoute>
              }
            />

            <Route
              path="/validar-cadastros"
              element={
                <RoleRoute roles={["secretaria"]}>
                  <ValidarCadastro />
                </RoleRoute>
              }
            />

            <Route>
              <Route
                path="/consulta"
                element={
                  <RoleRoute roles={["secretaria", "coordenador"]}>
                    <Consultas />
                  </RoleRoute>
                }
              >
                <Route
                  path="aula"
                  element={
                    <RoleRoute roles={["professor", "secretaria", "coordenador"]}>
                      <ConsultaAula />
                    </RoleRoute>
                  }
                />
                <Route
                  path="curso"
                  element={
                    <RoleRoute roles={["secretaria", "coordenador"]}>
                      <ConsultaCurso />
                    </RoleRoute>
                  }
                />
                <Route
                  path="professor"
                  element={
                    <RoleRoute roles={["secretaria", "coordenador"]}>
                      <ConsultarProfessor />
                    </RoleRoute>
                  }
                />
                <Route
                  path="aluno"
                  element={
                    <RoleRoute roles={["professor", "secretaria", "coordenador"]}>
                      <ConsultarAluno />
                    </RoleRoute>
                  }
                />
              </Route>
            </Route>


            <Route>
              <Route
                path="/relatorios"
                element={
                  <RoleRoute roles={["professor","secretaria", "coordenador"]}>
                    <Relatorios />
                  </RoleRoute>
                }
              >
                <Route
                  path="alunos-por-cursos"
                  element={<RelatorioAlunosCursos />}
                />
                <Route
                  path="vagas-por-cursos"
                  element={<RelatorioVagas />}
                />
              </Route>
            </Route>

            <Route
              path="/lista-de-chamada"
              element={
                <RoleRoute roles={["professor"]}>
                  <Chamada />
                </RoleRoute>
              }
            />

            <Route
              path="/gerenciar-aulas"
              element={
                <RoleRoute roles={["professor"]}>
                  <GerenciarAulas />
                </RoleRoute>
              }
            />

            <Route
              path="/emitir-documentos"
              element={
                <RoleRoute roles={["aluno", "secretaria", "coordenador"]}>
                  <EmitirDocumentosAluno />
                </RoleRoute>
              }
            />

            <Route
              path="/inscricao"
              element={
                <RoleRoute roles={["aluno"]}>
                  <Inscricao />
                </RoleRoute>
              }
            />

            <Route
              path="/minhas-inscricoes"
              element={
                <RoleRoute roles={["aluno"]}>
                  <MinhasInscricoes />
                </RoleRoute>
              }
            />

            <Route
              path="/meus-dados"
              element={
                <RoleRoute roles={["aluno"]}>
                  <MeusDados />
                </RoleRoute>
              }
            />
                
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoute