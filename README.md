# Automação de testes do projeto Engagesphere
Este projeto utiliza o Cypress para automação de testes de UI (interface do usuário) e testes de API.


📋 Pré-requisitos
Antes de rodar o projeto, você precisará ter as seguintes ferramentas instaladas:

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes que acompanha o Node.js) ou yarn

🔧 Instalando o Node.js e npm
Para instalar o Node.js e o npm, siga os passos abaixo:

Acesse o site oficial do [Node.js](https://nodejs.org/pt) e faça o download da versão recomendada para o seu sistema operacional:

Siga as instruções de instalação fornecidas pela página.

Verifique se o Node.js e npm estão instalados corretamente, executando os comandos abaixo no terminal:
*node -v*
*npm -v*

Se preferir usar yarn, instale-o globalmente:
*npm install -g yarn*


🚀 Clonando o projeto
Primeiro, clone o repositório para a sua máquina local:

git clone <url-do-repositorio>


📦 Instalação de Dependências
com npm:
npm install 

com yarn:
yarn install


🔧 Instalando o Cypress
Para instalar o Cypress. Siga os passos abaixo:

Com npm:
npm install cypress --save-dev

Com yarn:
yarn add cypress --dev


Após a instalação, você pode abrir o Cypress com o comando:
Com npm:
npx cypress open

Com yarn:
yarn run cypress open


▶️ Executando os Testes
Para rodar os testes automatizados, utilize o seguinte comando:

Com npm:
npx cypress run

Com yarn:
yarn run cypress run