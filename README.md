
# ConectaCEU WebApp

Este é o ConectaCEU, um sistema de gerenciamento do CEU São Rafael que permite o cadastro, visualização e controle de atividades, cursos e usuários. O objetivo é facilitar a organização e administração das atividades oferecidas.

![Logo](./frontend/src/assets/images/ConnectCEU.jpeg)

## Descrição

Este repositório contém o front-end da aplicação, responsável pela interface do usuário e pela comunicação com a API do sistema.

## 📸 Preview

![Tela de login]()

## 🚀 Tecnologias

[![React.js]][React-url] [![Vite]][Vite-url] [![Regex]][Regex-url]

## 🌐 Integração com API

A aplicação consome uma API REST disponível em:
`http://localhost:3000`

## ⚙️ Funcionalidades

### 🔐 Autenticação
- Login de usuários
- Recuperação de senha

### 👤 Gerenciamento de usuários
- Cadastro, edição e exclusão de usuários
- Atualização de dados pessoais
- Busca de usuários
- Listagem de presença

### 📚 Gerenciamento de cursos
- Cadastro, edição e exclusão de cursos
- Listagem e busca de cursos

### 🎨 Interface e experiência
- Mensagens de erro dinâmicas
- Renderização condicional de componentes
- Interface responsiva e acessível

## 📚 Estrutura do projeto

#### Principais diretórios:
- `assets/` → Imagens e ícones
- `components/` → Componentes reutilizáveis da interface
- `context/` → Gerenciamento de estado global
- `hooks/` → Funções para as páginas
- `pages/` → Páginas principais da aplicação
- `routes/` → Definição das rotas da aplicação
- `services/` → Configuração e chamadas para a API
- `utils/` → Funções utilitárias auxiliares

## 🔐 Variáveis de ambiente

```env
API_URL=URLdaApiAqui
```

## 🔧 Como executar

Para executar o projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

- **IDE:** Recomendado o uso do VS Code
- **Node.js:** Versão LTS recomendada (>= 18)

Primeiramente clone o repositório:
```
git clone https://github.com/drp14-pi-comp/ConectaCEU_WebApp.git
```

No terminal com bash execute:
```bash
npm install
npm run dev
```
O site estará acessível em `http://localhost:5173`.

**obs:** No terminal mostra o link onde o site local foi hospedado, segurando "ctrl" e clicando é possível acessá-lo direto.

## 📝 Licença

Esse projeto está sob licença apache 2.0. Veja o arquivo [LICENÇA](https://github.com/drp14-pi-comp/ConectaCEU_WebApp/blob/main/LICENSE) para mais detalhes.

## 📚 Saiba mais

Quer entender melhor como o projeto foi desenvolvido? Confira a documentação abaixo:

### 🎨 Design
- [Protótipo no Figma](https://www.figma.com/design/S6bJKIgZUPYCESefyBRL3c/ConectaCEU?node-id=0-1&p=f&t=rT1gnOqePGqcPJVE-0)

### ⚙️ Backend
- [Repositório da API](https://github.com/drp14-pi-comp/ConectaCEU_MiddlewareServices)

### 🛠️ Recursos utilizados
- [Flaticon](https://www.flaticon.com/) - ícones utilizados na interface
- [CSS Box Shadow Examples](https://getcssscan.com/css-box-shadow-examples) - referências para estilização


[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/

[Vite]: https://img.shields.io/badge/Vite-563D7C?style=for-the-badge&logo=vite&logoColor=FFD62E
[Vite-url]: https://vitejs.dev/

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/

[Regex]: https://img.shields.io/badge/Regex-FF6F00?style=for-the-badge
[Regex-url]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
