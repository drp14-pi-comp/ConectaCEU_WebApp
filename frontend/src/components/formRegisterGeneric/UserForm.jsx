import { Link } from "react-router-dom"
import { useState } from "react"

import { useUserForm } from "../../hooks/useUserForm"
import { useAuth } from '../../hooks/useAuth'
import { getAgeType } from "../../utils/TypeAge"

import "./UserForm.css"
import ModalDeleteAccount from "./ModalDeleteAccount"


// modal para confirmaçao e melhorar acessibilidade
const UserForm = () => {

  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  

  const isEdit = true

  const {
    formData,
    handleChange,
    handleResponsavelChange,
    handleResponsavelFileChange,
    handleSubmit,
    handleDelete,
    handleCancelDelete,
    // isEdit,
    role,
    loading,
    userDisable
  } = useUserForm(user)
  
  
  const ageType = getAgeType(formData.data_nascimento)


  return (
    <div className="container-form-register">
      <form 
        className="form-register" 
        onSubmit={handleSubmit} 
        aria-label="Formulário de cadastro"
      >
      <h1>{isEdit ? "Meus dados" 
        : (role === "admin" ? "Cadastrar usuário" : "Cadastrar aluno(a)")}
      </h1>

        <div className="form-grid">
          
          <div id="doc-aluno" className="input-group">
            <label>Documento<span>*</span></label>
            <div className="input-group-doc">
              <select 
                name="tipo_documento" 
                id="documento"
                value={formData.tipo_documento}
                onChange={handleChange} 
                required
              >
                <option value="default">Selecionar</option>
                <option value="rg">RG</option>
                <option value="cpf">CPF</option>
              </select>
              <input 
                type="text" 
                name="num_documento"
                value={formData.num_documento}
                onChange={handleChange} 
                placeholder="12345678900"
                minLength={9}
                maxLength={11} 
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Carregar documento(frente)<span>*</span></label>
            <input 
              type="file" 
              name="doc_frente"
              onChange={handleChange} 
              required={!isEdit}
            />
          </div>

          <div className="input-group">
            <label>Carregar documento(verso)<span>*</span></label>
            <input 
              type="file" 
              name="doc_verso"
              onChange={handleChange} 
              placeholder="Documento a ser carregado" 
              required={!isEdit}
            />
          </div>

          <div className="input-group">
            <label>Carregar foto<span>*</span></label>
            <input 
              type="file" 
              name="doc_foto"
              onChange={handleChange} 
              required={!isEdit}
            />
          </div>  

          <div className="input-group">
            <label>Nome completo<span>*</span></label>
            <input 
              type="text" 
              name="nome_completo" 
              value={formData.nome_completo}
              onChange={handleChange}
              placeholder="ex: Enzo de Souza Silva" 
              maxLength={150}
              required
            />
          </div>

          <div className="input-group">
            <label>E-mail<span>*</span></label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="ex: exemplo2@email.com"
              autoComplete="email"
              maxLength={200} 
              required
            />
          </div>

          <div className="input-group">          
            <label>Data de Nascimento<span>*</span></label>
            <input 
              type="date" 
              name="data_nascimento"
              value={formData.data_nascimento} 
              onChange={handleChange}
              placeholder="ex: 21/07/2010"
              required
            />
          </div>

          <div className="input-group">
            <label>Contato</label>
            <input 
              type="tel" 
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              pattern="[0-9\s\-\(\)\+]*" 
              placeholder="ex: (11)92345-6789"
              required 
            />
          </div>

          <div className="input-group">
            <label>Contato 2</label>
            <input 
              type="tel" 
              name="telefone2"
              value={formData.telefone2}
              onChange={handleChange} 
              pattern="[0-9\s\-\(\)\+]*" 
              placeholder="ex: (11)92345-6789"
            />
          </div>

          <div className="input-group">
            <label>Gênero<span>*</span></label>
            <select 
              name="genero" 
              id="genero" 
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="default">Selecionar</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="nao_binario">Não binário</option>
              <option value="outro">Outro</option>
              <option value="prefiro_nao_informar">Prefiro não informar</option>
            </select>
          </div>

          <div className="input-group">
            <label>Sexo<span>*</span></label>
            <select 
              name="sexo" 
              id="sexo"
              value={formData.sexo}
              onChange={handleChange} 
              required
            >
              <option value="default">Selecionar</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          <div className="input-group">
            <label>Escola:</label>
            <input 
              type="text" 
              name="escola"
              value={formData.escola}
              onChange={handleChange} 
              placeholder="ex: EMEF Maria Clara Machado" 
              required
            />
          </div>
          {!isEdit && (
            <>
              <div className="input-group">
                <label>Senha<span>*</span></label>
                <input 
                  type="password" 
                  name="senha" 
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="***********" 
                  minLength={8} 
                  maxLength={128} 
                  required
                />
                <h2>Deve conter: <br />
                  <ul>
                    <li>Entre 8 a 128 caracteres;</li>
                    <li>Pelo menos uma letra maiúscula e uma minúscula;</li>
                    <li>Pelo menos um número;</li>
                    <li>Pelo menos um caractere especial (!, @, $, &, %).</li>
                  </ul>
                </h2>
              </div>

              <div className="input-group">
                <label>Repetir senha<span>*</span></label>
                <input 
                  type="password" 
                  name="repetir_senha" 
                  value={formData.repetir_senha}
                  onChange={handleChange}
                  placeholder="***********" 
                  required
                />
              </div>
            </>
          )}
          
          <div className="input-group">
            <label >CEP<span>*</span></label>
            <input 
              type="text" 
              name="cep"
              value={formData.cep}
              onChange={handleChange} 
              placeholder="ex: 12345-678" 
              required
            />
          </div>

          <div className="input-group">
            <label >Logradouro<span>*</span></label>
            <input 
              type="text" 
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange} 
              placeholder="ex: Rua Louro Rosa" 
              required
            />
          </div>

          <div className="input-group">
            <label >Número<span>*</span></label>
            <input 
              type="number" 
              name="num_residencia"
              value={formData.num_residencia}
              onChange={handleChange} 
              placeholder="ex: 11" 
              required
            />
          </div>

          <div className="input-group">
            <label >Complemento</label>
            <input 
              type="text" 
              name="complemento"
              value={formData.complemento}
              onChange={handleChange} 
              placeholder="ex: bloco 2, apartamento 8"
            />
          </div>

          <div className="input-group">
            <label >Bairro<span>*</span></label>
            <input 
              type="text" 
              name="bairro"
              value={formData.bairro}
              onChange={handleChange} 
              placeholder="ex: Aricanduva" 
              required
            />
          </div>
          
          {role === "admin" && (
            <div className="input-group">
              <label>Tipo de usuário<span>*</span></label>
              <select 
                name="tipo_usuario" 
                id="tipo_usuario"
                value={formData.tipo_usuario}
                onChange={handleChange} 
                required
              > 
                <option value="coordenador">Coordenador(a)</option>
                <option value="secretario">Secretario(a)</option>
                <option value="professor">Professor(a)</option>
              </select>
            </div>
          )}

        </div>
        
        {ageType === "minor" && (
          <div className="form-responsible">
            <h3>Área do responsável (Obrigatória somente se o aluno for menor de idade)</h3>

            <h4>Responsável 1</h4>
            <div className="responsible-area">

              <div className="input-group">
                <label>Nome completo<span>*</span></label>
                <input 
                  type="text" 
                  name="nome_completo_responsavel"
                  value={formData.responsaveis[0].nome_completo_responsavel}
                  onChange={(e) => handleResponsavelChange(0, e)} 
                  placeholder="ex: Eduardo de Souza Silva" 
                  required
                />
              </div>

              <div className="input-group">
                <label>Grau<span>*</span></label>
                <input 
                  type="text" 
                  name="grau"
                  value={formData.responsaveis[0].grau}
                  onChange={(e) => handleResponsavelChange(0, e)} 
                  placeholder="ex: pai" 
                  required
                />
              </div>

              <div className="input-group">
                <label>Documento<span>*</span></label>
                <div className="input-group-doc">
                  <select 
                    name="tipo_documento" 
                    id="documento"
                    value={formData.responsaveis[0].tipo_documento}
                    onChange={(e) => handleResponsavelChange(0, e)}  
                    required
                    >
                    <option value="default">selecionar</option>
                    <option value="rg">RG</option>
                    <option value="cpf">CPF</option>
                  </select>
                  <input 
                    type="text" 
                    name="num_documento"
                    value={formData.responsaveis[0].num_documento}
                    onChange={(e) => handleResponsavelChange(0, e)} 
                    placeholder="12345678900"
                    required
                    minLength={8}
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Carregar documento<span>*</span></label>
                <input 
                  type="file" 
                  name="doc_responsavel" 
                  onChange={(e) => handleResponsavelFileChange(0, e)}
                  required={!isEdit}
                />
              </div>

              <div className="input-group">
                <label>Carregar autorização</label>
                <input 
                  type="file" 
                  name="doc_autorizacao"
                  onChange={(e) => handleResponsavelFileChange(0, e)} 
                  required={!isEdit}
                />
              </div>
            </div>

            <h5>Responsável 2</h5>
            <div className="responsible-area">

              <div className="input-group">
                <label>Nome completo<span>*</span></label>
                <input 
                  type="text" 
                  name="nome_completo_responsavel"
                  value={formData.responsaveis[1].nome_completo_responsavel}
                  onChange={(e) => handleResponsavelChange(1, e)} 
                  placeholder="ex: Julia de Souza Silva" 
                />
              </div>

              <div className="input-group">
                <label>Grau<span>*</span></label>
                <input 
                  type="text" 
                  name="grau"
                  value={formData.responsaveis[1].grau}
                  onChange={(e) => handleResponsavelChange(1, e)} 
                  placeholder="ex: Mãe" 
                />
              </div>

              <div className="input-group">
                <label>Documento<span>*</span></label>
                <div className="input-group-doc">
                  <select 
                    name="tipo_documento" 
                    id="documento"
                    value={formData.responsaveis[1].tipo_documento}
                    onChange={(e) => handleResponsavelChange(1, e)}  
                  >
                    <option value="default">selecionar</option>
                    <option value="rg">RG</option>
                    <option value="cpf">CPF</option>
                  </select>
                  <input 
                    type="text" 
                    name="num_documento"
                    value={formData.responsaveis[1].num_documento}
                    onChange={(e) => handleResponsavelChange(1, e)} 
                    placeholder="12345678900"
                    minLength={8}
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Carregar documento<span>*</span></label>
                <input 
                  type="file" 
                  name="doc_responsavel"
                  onChange={(e) => handleResponsavelFileChange(1, e)}
                />
              </div>

              <div className="input-group">
                <label>Carregar autorização</label>
                <input 
                  type="file" 
                  name="doc_autorizacao"
                  onChange={(e) => handleResponsavelFileChange(1, e)}
                />
              </div>
            </div>
          </div>
        )}

        {ageType === "elderly" && (
          <div className="form-responsible">

            <h3>Atestado de saúde(Obrigatória somente se o aluno tiver 70+ anos)</h3>
            <div className="responsible-area">
              <div className="input-group">
                <label>Carregar documento<span>*</span></label>
                <input 
                  type="file" 
                  name="doc_atestado"
                  onChange={handleChange} 
                  required={!isEdit}
                />
              </div>
            </div>

          </div>
        )} 

        {role === "admin" ? (
          <div className="terms-container">
            
            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário atesta que as informações registradas 
                aqui são autênticas, estando sujeito ás devidas sanções caso contrário.
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário autoriza o uso de dados pessoais 
                conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário autoriza o uso de imagem quando
                necessário para materiais de propaganda do CEU 
                conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>
            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário concorda com os {" "}
                <Link to="/termos-de-uso" className="link" target="_blank">Termos de Uso</Link>
                {" "} e as {" "}
                <Link to="/politica-de-privacidade" className="link" target="_blank">Políticas de Privacidade</Link>.
              </p>
            </div>

          </div>
        ) : (
          <div className="terms-container">

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável atesta que as informações registradas 
                aqui são autênticas, estando sujeito ás devidas sanções caso contrário.
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável autoriza o uso de dados pessoais 
                do aluno conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável autoriza o uso de imagem do aluno 
                quando necessário para materiais de propaganda do CEU 
                conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável concorda com os {" "}  
                <Link to="/termos-de-uso" className="link" target="_blank">Termos de Uso</Link>
                {" "}e as{" "}
                <Link to="/politica-de-privacidade" className="link" target="_blank">Política de Privacidade</Link>.
              </p>
            </div>

          </div>
        )}
        {!isEdit ? (
          <button 
            className={`btn ${loading ? "loading" : ""}`}
            type="submit" 
            disabled={loading}
          >
            {loading ? "Salvando..." : 
              (isEdit ? "Salvar alterações" : "Criar conta")
            }
          </button>

        ) : ( 
          <>
            {!userDisable ? (
              <div className="box-btn-form">
                <button 
                  type="button" 
                  className="btn-delete"
                  onClick={() => setOpenModal(true)}
                >
                  Apagar conta
                </button>

                <button 
                  className={`btn ${loading ? "loading" : ""}`}
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? "Salvando..." : 
                    (isEdit ? "Salvar alterações" : "Criar conta")
                  }
                </button>
              </div>
            ) : (
              <div className="box-btn-cancel-delete">
                <button 
                  type="button" 
                  className="btn-cancel-delete"
                  onClick={handleCancelDelete}
                >
                  Habilitar usuário
                </button>
              </div>
            )}
            
              <ModalDeleteAccount 
                isOpen={openModal} 
                setModalOpen={() => setOpenModal(false)} 
                handleDelete={handleDelete}
              />
        
          </>
        )}

        {userDisable && (
          <div className="warning-delete">
            <p>Sua conta está agendada para exclusão.</p>
          </div>
        )}

      </form>
    </div>
  )
}

export default UserForm