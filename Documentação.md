# Projeto de API de Cidades Brasileiras

Esta documentação descreve a arquitetura e as tecnologias empregadas no desenvolvimento da API de consulta de informações sobre municípios brasileiros.

Grupo: Douglas Giacomelli da Silva e Lorenzo Mottin Jablonski

## 1. Tecnologias e Linguagens Utilizadas

O projeto foi construído sobre a plataforma Node.js e utiliza as seguintes tecnologias e linguagens:

* **Linguagem de Programação:**
  * **TypeScript:** A aplicação é desenvolvida em TypeScript, um superset do JavaScript que adiciona tipagem estática, conferindo maior robustez e manutenibilidade ao código. O arquivo `tsconfig.json` configura o compilador para gerar código JavaScript compatível com a versão `es6` do EcmaScript.

* **Framework e Bibliotecas do Backend:**
  * **Node.js:** É o ambiente de execução do lado do servidor.
  * **Express.js:** Utilizado como framework para a construção da API, simplificando a criação de rotas e o gerenciamento de requisições e respostas HTTP.
  * **ts-node:** Ferramenta de desenvolvimento que permite a execução de código TypeScript diretamente no Node.js sem a necessidade de uma compilação prévia.
  * **mysql2:** Driver para a conexão com o banco de dados MySQL, permitindo a execução de consultas SQL a partir da aplicação Node.js.

* **Banco de Dados:**
  * **MySQL:** Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados dos municípios. O script `create-table.ts` define a estrutura da tabela `municipios`.

* **Frontend (Página de Testes):**
  * **HTML, CSS e JavaScript:** A interface de teste da API é construída com tecnologias web padrão. A página `index.html` estrutura os formulários para interagir com os endpoints da API, e o `script.js` gerencia a lógica de envio das requisições e exibição dos resultados.

## 2. Estrutura e Arquitetura do Projeto

O projeto segue uma arquitetura em camadas (layered architecture), que promove a separação de responsabilidades, facilitando a manutenção e a escalabilidade.

* **Estrutura de Diretórios:**
  * `src/`: Contém todo o código-fonte da aplicação em TypeScript.
  * `dist/`: Diretório de saída para o código JavaScript compilado, utilizado em produção.
  * `public/`: Armazena os arquivos estáticos do frontend (HTML, CSS, JS).
  * `scripts/`: Inclui scripts auxiliares, como o `load-data.ts` para popular o banco de dados.

* **Camadas da Arquitetura:**

    1. **Camada de Rotas (Routes):**
        * O arquivo `src/routes/MunicipioRoutes.ts` define os endpoints da API. Ele utiliza o roteador do Express para mapear as URLs (como `/api/municipios` ou `/api/capitais`) para os métodos correspondentes na camada de Controller.

    2. **Camada de Controladores (Controllers):**
        * Localizada em `src/controllers/MunicipioController.ts`, esta camada é responsável por receber as requisições HTTP, extrair os parâmetros (queries, params) e invocar a camada de Serviço para processar a lógica de negócio. Ao final, ela formata e envia a resposta ao cliente.

    3. **Camada de Serviços (Services):**
        * O arquivo `src/services/MunicipioService.ts` orquestra a lógica de negócio da aplicação. Ele atua como um intermediário entre os Controladores e os Repositórios, processando os dados recebidos e preparando-os para a resposta. Por exemplo, no método `listMunicipiosByPopulacao`, ele formata os dados antes de devolvê-los, incluindo a contagem de municípios.

    4. **Camada de Repositórios (Repositories):**
        * A interface `IMunicipioRepository.ts` define um contrato com os métodos de acesso a dados que devem ser implementados, seguindo o padrão de Inversão de Dependência. A implementação `MunicipioRepository.ts` serve como uma abstração sobre a camada de acesso a dados (DAO).

    5. **Camada de Acesso a Dados (DAO - Data Access Object):**
        * O `src/daos/MunicipioDAO.ts` é responsável pela comunicação direta com o banco de dados. Ele contém as consultas SQL para realizar as operações de leitura (SELECT) na tabela `municipios`, utilizando a pool de conexões configurada em `src/database/index.ts`.

* **Padrões Utilizados:**
  * **DAO (Data Access Object):** A separação da lógica de acesso ao banco de dados em uma camada específica (DAO) permite que a aplicação seja independente da tecnologia de banco de dados utilizada.
  * **Repository Pattern:** O uso de um repositório como intermediário entre a lógica de negócio e o DAO adiciona uma camada extra de abstração, facilitando a substituição da fonte de dados e a implementação de testes.
  * **Inversão de Dependência:** A interface `IMunicipioRepository` desacopla a camada de serviço da implementação concreta do repositório, permitindo maior flexibilidade.
