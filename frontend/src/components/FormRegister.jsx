import { useState } from "react"

import { useAuth } from '../hooks/useAuth'
import { getAgeType } from "../utils/TypeAge"

import "./FormRegister.css"


const FormRegister = () => {

  const { user } = useAuth()
  const [dateBirth, setDateBirth] = useState("")


const ageType = getAgeType(dateBirth)
  

  return (
    <div className="container-form-register">
      <form className="form-register">
      <h1>Cadastrar usuário</h1>

        <div className="form-grid">
          
          <div id="doc-aluno" className="input-group">
            <label>Documento<span>*</span></label>
            <div className="input-group-doc">
              <select name="tipo_documento" id="documento" defaultValue={"selecionar"} required>
                <option value="default">Selecionar</option>
                <option value="rg">RG</option>
                <option value="cpf">CPF</option>
              </select>
              <input 
                type="text" 
                name="documento" 
                placeholder="12345678900"
                minLength={9}
                maxLength={11} 
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Carregar documento(frente)<span>*</span></label>
            <input type="file" name="documento_frente" required/>
          </div>

          <div className="input-group">
            <label>Carregar documento(verso)<span>*</span></label>
            <input type="file" name="documento_verso" placeholder="Documento a ser carregado" required/>
          </div>

          <div className="input-group">
            <label>Carregar foto<span>*</span></label>
            <input type="file" name="documento_foto" required/>
          </div>

          <div className="input-group">
            <label>Nome completo<span>*</span></label>
            <input type="text" name="nome_completo" placeholder="ex: Enzo de Souza Silva" required/>
          </div>

          <div className="input-group">
            <label>E-mail<span>*</span></label>
            <input type="email" name="email" placeholder="ex: exemplo2@email.com" required/>
          </div>

          <div className="input-group">          
            <label>Data de Nascimento<span>*</span></label>
            <input 
              type="date" 
              name="data_de_nascimento" 
              placeholder="ex: 21/07/2010"
              onChange={(e) => setDateBirth(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Contato</label>
            <input 
              type="tel" 
              name="telefone"
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
              pattern="[0-9\s\-\(\)\+]*" 
              placeholder="ex: (11)92345-6789"
            />
          </div>

          <div className="input-group">
            <label>Gênero<span>*</span></label>
            <select name="genero" id="genero" defaultValue={"selecionar"} required>
              <option value="selecionar">Selecionar</option>
              <option value="">Masculino</option>
              <option value="">Feminino</option>
              <option value="">Não binário</option>
              <option value="">Outro</option>
              <option value="">Prefiro não informar</option>
            </select>
          </div>

          <div className="input-group">
            <label>Sexo<span>*</span></label>
            <select name="sexo" id="sexo" defaultValue={"selecionar"} required>
              <option value="selecionar">Selecionar</option>
              <option value="masculino">Masculino</option>
              <option value="ferminino">Ferminino</option>
            </select>
          </div>

          <div className="input-group">
            <label>Escola:</label>
            <input type="text" name="escola" placeholder="ex: EMEF Maria Clara Machado" required/>
          </div>

          <div className="input-group">
            <label>Senha<span>*</span></label>
            <input 
              type="password" 
              name="senha" 
              placeholder="***********" 
              minLength={8} 
              maxLength={128} 
              required
            />
            <p>Deve conter: <br />
              <ul>
                <li>Entre 8 a 128 caracteres;</li>
                <li>Pelo menos uma letra maiúscula e uma minuscula;</li>
                <li>Pelo menos um número;</li>
                <li>Pelo menos um caractere especial (!, @, $, &, %).</li>
              </ul>
            </p>
          </div>

          <div className="input-group">
            <label>Repetir senha<span>*</span></label>
            <input type="text" name="repetir_senha" placeholder="***********" required/>
          </div>

          <div className="input-group">
            <label >CEP<span>*</span></label>
            <input type="text" name="cep" placeholder="ex: 12345-678" required/>
          </div>

          <div className="input-group">
            <label >Logradouro<span>*</span></label>
            <input type="text" name="logradouro" placeholder="ex: Rua Louro Rosa" required/>
          </div>

          <div className="input-group">
            <label >Número<span>*</span></label>
            <input type="number" name="numero_residencia" placeholder="ex: 11" required/>
          </div>

          <div className="input-group">
            <label >Complemento</label>
            <input type="text" name="complemento" placeholder="ex: bloco 2, apartamento 8"/>
          </div>

          <div className="input-group">
            <label >Bairro<span>*</span></label>
            <input type="text" name="bairro" placeholder="ex: Aricanduva" required/>
          </div>
          
          {(user?.nome) === "admin" && (
            <div className="input-group">
              <label>Tipo de usuário<span>*</span></label>
              <select name="tipo_usuario" id="tipo_usuario" required> 
                <option value="masculino">Coordenador(a)</option>
                <option value="ferminino">Secretario(a)</option>
                <option value="ferminino">Professor(a)</option>
              </select>
            </div>
          )}

        </div>
        
        {ageType === "minor" && (
          <div className="form-responsible">
            <h2>Área do responsável (Obrigatória somente se o aluno for menor de idade)</h2>

            <h3>Responsável 1</h3>
            <div className="responsible-area">

              <div className="input-group">
                <label>Nome completo<span>*</span></label>
                <input type="text" name="nome_completo_responsavel" placeholder="ex: Eduardo de Souza Silva" required/>
              </div>

              <div className="input-group">
                <label>Grau<span>*</span></label>
                <input type="text" name="grau_responsavel" placeholder="ex: pai" required/>
              </div>

              <div className="input-group">
                <label>Documento<span>*</span></label>
                <div className="input-group-doc">
                  <select name="tipo_doc_responsavel" id="documento" defaultValue={"selecionar"} required>
                    <option value="default">selecionar</option>
                    <option value="rg">RG</option>
                    <option value="cpf">CPF</option>
                  </select>
                  <input 
                    type="text" 
                    name="num_doc_responsavel" 
                    placeholder="12345678900"
                    required
                    minLength={8}
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Carregar documento<span>*</span></label>
                <input type="file" name="documento_responsavel" required/>
              </div>

              <div className="input-group">
                <label>Carregar autorização</label>
                <input type="file" name="documento_autorizacao" required/>
              </div>
            </div>

            <h3>Responsável 2</h3>
            <div className="responsible-area">

              <div className="input-group">
                <label>Nome completo<span>*</span></label>
                <input type="text" name="nome_completo_responsavel2" placeholder="ex: Julia de Souza Silva" />
              </div>

              <div className="input-group">
                <label>Grau<span>*</span></label>
                <input type="text" name="grau_responsavel2" placeholder="ex: Mãe" />
              </div>

              <div className="input-group">
                <label>Documento<span>*</span></label>
                <div className="input-group-doc">
                  <select name="documento_responsavel2" id="documento" defaultValue={"selecionar"} >
                    <option value="default">selecionar</option>
                    <option value="rg">RG</option>
                    <option value="cpf">CPF</option>
                  </select>
                  <input 
                    type="text" 
                    name="num_doc_responsavel2" 
                    placeholder="12345678900"
                    minLength={8}
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Carregar documento<span>*</span></label>
                <input type="file" name="documento_responsavel2"/>
              </div>

              <div className="input-group">
                <label>Carregar autorização</label>
                <input type="file" name="documento_autorizacao2"/>
              </div>
            </div>
          </div>
        )}

        {ageType === "elderly" && (
          <div className="form-responsible">

            <h2>Atestado de saúde(Obrigatória somente se o aluno tiver 70+ anos)</h2>
            <div className="responsible-area">
              <div className="input-group">
                <label>Carregar documento<span>*</span></label>
                <input type="file" name="atestado" required/>
              </div>
            </div>

          </div>
        )} 

        {(user?.nome) === "admin" ? (
          <div className="terms-container">
            
            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário atesta que as informações registradas <br />
                aqui são autênticas, estando sujeito ás devidas sanções caso contrário.
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário autoriza o uso de dados pessoais <br />
                conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O funcionário autoriza o uso de imagem quando<br />
                necessário para materiais de propaganda do CEU <br />
                conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

          </div>
        ) : (
          <div className="terms-container">

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável atesta que as informações registradas <br />
                aqui são autênticas, estando sujeito ás devidas sanções caso contrário.
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável autoriza o uso de dados pessoais <br />
                do aluno conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

            <div className="term">
              <input type="checkbox" required/>
              <p>O aluno ou responsável autoriza o uso de imagem do aluno <br />
                quando necessário para materiais de propaganda do CEU <br />
                conforme a LGPD(Lei n° 13.709/2018).
              </p>
            </div>

          </div>
        )}

        <button className="btn" type="submit" >Criar conta</button>

      </form>
    </div>
  )
}

export default FormRegister
