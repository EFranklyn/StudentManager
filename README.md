
# Student Manager

Este é um sistema de gerenciamento de estudantes desenvolvido utilizando **React.js**. O sistema permite realizar o cadastro de estudantes do ensino superior, com validações para garantir que as informações fornecidas sejam consistentes e precisas.

## Funcionalidades

- Cadastro de estudantes com campos obrigatórios como nome completo, e-mail, data de nascimento, instituição de ensino, curso e cidade.
- Validação de dados de entrada, garantindo que todos os campos sejam preenchidos corretamente.
- O sistema permite cadastrar, editar e excluir estudantes.

## Tecnologias Utilizadas

- **React.js**: Framework principal utilizado para o desenvolvimento do front-end.
- **Bootstrap**: Framework CSS utilizado para estilizar os componentes e garantir um layout responsivo.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **React-Bootstrap**: Integração do Bootstrap com React.
- **React-Cropper**: Biblioteca para cortar imagens (usada no upload de fotos dos estudantes).
- **Class-Validator**: Biblioteca para validação de dados de entrada no back-end.
- **Semantic Release**: Configuração de CI (Integração Contínua) para versionamento automático e release de novas versões.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/EFranklyn/StudentManager.git
cd student-manager
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Isso irá iniciar o servidor de desenvolvimento e você pode acessar o projeto em [http://localhost:5173](http://localhost:5173).

## CI com Semantic Release

O **Semantic Release** é uma ferramenta que automatiza o processo de versionamento e geração de changelogs. Com essa configuração de CI, o projeto tem um versionamento semântico automático, o que significa que as versões do projeto são incrementadas automaticamente com base nos tipos de alterações feitas no código (ex: `patch`, `minor`, `major`). 

**Vantagens para o projeto**:
- **Automação do versionamento**: Não é necessário gerenciar manualmente os números das versões, o que reduz a possibilidade de erro humano.
- **Geração de changelog**: A cada nova versão, um changelog é gerado automaticamente, facilitando a comunicação sobre as alterações realizadas no código para outros desenvolvedores e usuários finais.
- **Controle de qualidade**: A integração contínua com Semantic Release garante que apenas commits validos e com mensagens semânticas apropriadas sejam lançados, facilitando o processo de lançamentos contínuos.

## Validação de Dados com class-validator

A **class-validator** é uma biblioteca poderosa para validar dados de entrada, especialmente útil em projetos que envolvem interação com formulários. A utilização dessa biblioteca no projeto tem como objetivo garantir que os dados do estudante sejam validados antes de serem processados.

**Vantagens para o projeto**:
- **Validação de campos complexos**: Com a class-validator, podemos garantir que os campos do formulário de cadastro (como e-mail e data de nascimento) estejam no formato correto antes de serem enviados ou salvos no banco de dados.
- **Facilidade de uso**: As regras de validação podem ser definidas diretamente nas classes de dados e aplicadas automaticamente, reduzindo a necessidade de lógica de validação repetitiva no código.
- **Segurança**: Garante que as informações recebidas no formulário estejam sempre no formato esperado, evitando possíveis falhas de segurança ou erros devido a dados malformados.

## Como Funciona o Cadastro de Estudantes

O formulário de cadastro de estudantes coleta as seguintes informações:

- **Nome Completo**: Um campo de texto para o nome completo do estudante (com validação de nome e sobrenome).
- **E-mail**: Um campo de e-mail que valida se o formato está correto.
- **Data de Nascimento**: Um campo de data que valida se o estudante tem pelo menos 14 anos.
- **Instituição de Ensino**: Um campo de texto para a instituição de ensino do estudante.
- **Curso**: Um campo de lista suspensa que usa uma API para buscar e exibir cursos predefinidos.
- **Cidade e Estado**: Um campo de lista suspensa que usa a API do IBGE para buscar e exibir as opções de cidade e estado.
- **Foto**: Um campo de upload de imagem (JPG ou PNG) com limite de 1MB de tamanho.
- **Redes Sociais**: Campos para adicionar links de redes sociais como Facebook e LinkedIn.

## Conclusão

Este projeto utiliza boas práticas de desenvolvimento, como validação de dados, integração contínua e versionamento semântico para garantir um fluxo de trabalho eficiente e uma boa experiência para o usuário.