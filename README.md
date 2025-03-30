Student Manager
Este projeto é uma aplicação de cadastro de estudantes do ensino superior construída com o framework React.js. A aplicação permite que os administradores cadastrem, editem, excluam e visualizem informações de estudantes, como dados pessoais, instituição de ensino, curso, cidade/estado, foto e redes sociais.

Funcionalidades
Cadastro de Estudantes: Permite inserir dados como nome completo, e-mail, data de nascimento, instituição de ensino, curso, cidade/estado e foto.

Edição de Estudantes: Permite a edição de qualquer informação cadastrada.

Exclusão de Estudantes: Permite excluir estudantes já cadastrados.

Validações: A aplicação inclui validações para garantir que os campos obrigatórios sejam preenchidos corretamente (como nome completo, e-mail e data de nascimento).

Integração com APIs:

A lista de cursos é obtida a partir de uma API pública.

A lista de cidades e estados é obtida de outra API pública.

Interface de Usuário: Utilização do React-Bootstrap para uma interface limpa e funcional.

Tecnologias Utilizadas
React.js: Framework JavaScript para construir interfaces de usuário.

TypeScript: Superset de JavaScript que adiciona tipagem estática e outros recursos.

Axios: Biblioteca para fazer requisições HTTP e obter dados de APIs externas.

React-Bootstrap: Componentes prontos para construção de interfaces modernas.

SweetAlert2: Biblioteca para mostrar alertas e feedbacks de forma amigável ao usuário.

React Router: Para navegação entre as diferentes páginas da aplicação.

React-Cropper: Para cortar imagens antes de enviá-las.

React Input Mask e React IMask: Para formatação de entradas, como e-mail, telefone e data de nascimento.

Como Iniciar o Projeto
Siga os passos abaixo para configurar e rodar a aplicação localmente.

1. Clonando o repositório
Primeiro, clone o repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/student-manager.git
cd student-manager
2. Instalando as dependências
Instale as dependências do projeto com o npm ou yarn:

bash
Copiar
Editar
npm install
# ou
yarn install
3. Rodando a aplicação
Depois de instalar as dependências, inicie o servidor de desenvolvimento:

bash
Copiar
Editar
npm run dev
# ou
yarn dev
A aplicação estará disponível em http://localhost:3000 no seu navegador.

4. Ambiente de Produção
Para gerar a versão de produção da aplicação, use o comando abaixo:

bash
Copiar
Editar
npm run build
# ou
yarn build
5. Testando a Aplicação
Você pode testar a aplicação com a seguinte configuração:

bash
Copiar
Editar
npm run preview
# ou
yarn preview
6. Dependências de Desenvolvimento
Vite: Ferramenta de build e bundling rápido para aplicações React.

TypeScript: Para garantir a tipagem estática e um desenvolvimento mais robusto.

ESLint: Para garantir a qualidade do código e manter o estilo consistente.

Prettier: Para formatação de código automática.

Como Contribuir
Se você quiser contribuir para o projeto, siga os seguintes passos:

Faça um fork deste repositório.

Crie uma branch para sua feature (git checkout -b feature/nova-feature).

Faça as alterações necessárias e commit as mudanças (git commit -am 'Adiciona nova feature').

Envie para o repositório remoto (git push origin feature/nova-feature).

Abra um pull request.

Considerações Finais
Este projeto foi desenvolvido como parte de uma avaliação prática e visa demonstrar as habilidades de integração de APIs externas, gerenciamento de estados, e a criação de interfaces amigáveis utilizando React e TypeScript.

