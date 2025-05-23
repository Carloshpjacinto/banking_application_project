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

## </> Endpoints da API:

#### POST - /auth/register

#### POST - /auth/register/access

#### POST - /auth/login

#### GET - /auth/profile

#### POST - /auth/transfer

## ⚙️ Instalação e Execução

### 1. Clone o repositório

#### bash

git clone https://github.com/Carloshpjacinto/banking_application_project.git<br>
cd banking_application_project

### 2. Instalação das dependencias

#### npm install

### 3. Configurar as variaveis de ambiente

#### O arquivo .env.example serve como exemplo dos nomes das variáveis de ambiente usadas no projeto.

### 4. Execução dos testes

#### npm run test

### 5. Execução da aplicação

#### npm run start:dev
