import {Route, Routes} from "react-router-dom"

//Layout 
import FullLayout from "../pages/layout/FullLayout.jsx"

//Rotas públicas
import UserLogin from "../pages/login/UserLogin.jsx"
import CreateAccount from "../pages/login/CreateAccount.jsx"
import RecoverPassword from "../pages/login/RecoverPassword.jsx"
import ResetPassword from "../pages/login/ResetPassword.jsx"
import NotFound from '../pages/NotFound.jsx'


//Rotas privadas
import Home from '../pages/Home.jsx'
import GerenciarAulas from '../pages/professor/GerenciarAulas.jsx'
import Inscricao from '../pages/aluno/Inscricao.jsx'
import MinhasInscricoes from '../pages/aluno/MinhasInscricoes.jsx'
import Cadastro from '../pages/Cadastro.jsx'
import Consulta from '../pages/Consulta.jsx'
import Presenca from '../pages/professor/Presenca.jsx'
import Relatorios from '../pages/Relatorios.jsx'
import Usuarios from '../pages/admin/Usuarios.jsx'
import Comunicados from '../pages/gestao/Comunicados.jsx'
import EmitirDocumentos from '../pages/gestao/EmitirDocumentos.jsx'
import ValidarCadastro from '../pages/gestao/ValidarCadastro.jsx'
import MeusDados from '../pages/aluno/MeusDados'

//Proteção das rotas
import PrivateRoute from "./PrivateRoutes.jsx"
import RoleRoute from "./RouleRoute.jsx"


function AppRoute(){


    return(
        <div>
            <Routes>
                <Route element={<FullLayout/>}>
                    {/* Rotas Publicas */}
                    <Route path="/login" element={<UserLogin />}/>
                    <Route path="/criar-conta" element={<CreateAccount />}/>
                    <Route path="/recuperar-senha" element={<RecoverPassword />}/>
                    <Route path="/redefinir-senha" element={<ResetPassword />}/>
                    <Route path="*" element={<NotFound />}/>


                    {/* Rotas Privadas */}
                    <Route element={<PrivateRoute />}>

                        <Route path="/"element={<Home/>}/>
                        
                        {/* admin */}
                        <Route
                            path="/usuarios"
                            element={
                                <RoleRoute roles={["admin"]}>
                                    <Usuarios />
                                </RoleRoute>
                            }
                        />

                        {/* admin/cadastro */}
                        <Route
                            path="/cadastro"
                            element={
                                <RoleRoute roles={["admin", "professor", "secretaria", "coordenador"]}>
                                    <Cadastro />
                                </RoleRoute>
                            }
                        />

                        <Route
                            path="/consulta"
                            element={
                                <RoleRoute roles={["secretaria", "coordenador"]}>
                                    <Consulta />
                                </RoleRoute>
                            }
                        />

                        <Route
                            path="/relatorios"
                            element={
                                <RoleRoute roles={["professor","secretaria", "coordenador"]}>
                                    <Relatorios />
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
                            path="/emitir-documentos"
                            element={
                                <RoleRoute roles={["aluno", "secretaria", "coordenador"]}>
                                    <EmitirDocumentos />
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

                        <Route
                            path="/presenca"
                            element={
                                <RoleRoute roles={[]}>
                                    <Presenca />
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