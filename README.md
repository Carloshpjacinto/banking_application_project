# 🏦 Banking Application - Backend

### API RESTful para gerenciamento de contas bancárias e transações financeiras. Construída com NestJS, TypeScript, e MySQL.

---

##### 📄 Para informações mais detalhadas, a documentação e os registros de ADR estão disponíveis em uma pasta do projeto.

---

## 🚀 Tecnologias Utilizadas

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" width="45" height="45" style="margin-right: 50px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" width="45" height="45"/>
</div>

---

## 📁 Arquitetura

### A arquitetura modular baseada em NestJS segue os princípios SOLID (especialmente responsabilidade única), com injeção de dependência nativa, organização clara e foco em escalabilidade e testabilidade.

---

## 👨‍💻 Principais funcionalidades:

 ##### Cadastro de usuário e criação de conta bancária
 ##### Login de usuário
 ##### Autenticação via JWT
 ##### Dashboard do usuário
 ##### Depósito de valores na conta
 ##### Transferência de valores entre contas

## </> Principais Endpoints da API:

### A Collection dos endpoints da API está inclusa no projeto (criada no Postman).

#### POST - /auth/register

#### POST - /auth/register/access

#### POST - /auth/login

#### GET - /auth/profile

#### POST - /auth/transfer

##### Este endpoint pode receber três tipos diferentes de transferências (type_transfer): PIX_TRANSFER_DEBIT, PIX_TRANSFER_CREDIT ou DEPOSIT.

##### Em caso de testes feitos no Postman (a coleção de endpoints está disponível no projeto), para realizar depósitos é necessário apenas inserir DEPOSIT no campo type_transfer, informar o próprio CPF da conta em cpf_recipient e o valor a ser enviado.

#### GET - /auth/bankaccounthistory

##### Este endpoint pode receber três tipos diferentes de queries no campo description: DEPOSIT (depósitos), SENT (enviados) ou RECEIVED (recebidos). Ele retorna as movimentações da conta filtradas de acordo com a opção escolhida.

#### GET - /bankaccount/{userId}

#### - Para realizar transferências Pix por Crédito:
EX:
cpf_recipient: "12345678910"
transfer_value: "0.0"
function_transfer: TRANSFER_CREDIT
type_transfer: PIX_TRANSFER

##### Realizar transferências por crédito gera um débito na conta (esse valor não é alterado com a realização de depósitos).

#### - Para realizar transferências Pix por Débito:
EX:
cpf_recipient: "12345678910"
transfer_value: "0.0"
function_transfer: TRANSFER_DEBIT
type_transfer: PIX_TRANSFER

#### - Para realizar transferências do tipo Depósito:
EX:
cpf_recipient: "Preencher o proprio CPF do usuario da conta"
transfer_value: "0.0"
function_transfer: " "
type_transfer: DEPOSIT

#### Explicação da função Cheque Especial:
O cheque especial é utilizado quando o usuário não possui saldo em conta ou valor em crédito para realizar transferências. Nesse caso, o valor da transferência será enviado e descontado do cheque especial, tornando o saldo da conta negativo. O valor negativado será cobrado automaticamente ao realizar um depósito: o valor devido será descontado, e o restante ficará disponível para novas transferências.

## ⚙️ Instalação e Execução

### 1. Clone o repositório

#### bash

    git clone https://github.com/Carloshpjacinto/banking_application_project.git<br>

### 2. Instalação das dependencias

    npm install

### 3. Configurar as variaveis de ambiente

#### O arquivo .env.example serve como exemplo dos nomes das variáveis de ambiente usadas no projeto.

### 4. Execução dos testes

    npm run test:cov

### 5. Execução da aplicação

    npm run start:dev
