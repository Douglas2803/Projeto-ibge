# Cidades Brasileiras API

Esta é uma API para consulta de informações sobre municípios brasileiros, utilizando dados do IBGE.

## Pré-requisitos

- Node.js
- MySQL

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cidades-brasileiras-app.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=seu-password
   DB_DATABASE=IBGE
   ```
4. Crie o banco de dados `IBGE` no seu MySQL.

## Carregando os Dados

Para popular o banco de dados, execute o script `load-data.ts`:

```bash
npx ts-node scripts/load-data.ts
```

**Observação:** O script espera que o arquivo `2022_IBGE-Municipios.csv` esteja na raiz do projeto.

## Rodando a Aplicação

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Para build e start em produção:

```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3000`.

## Endpoints da API

- `GET /municipios?nome=<nome>`: Busca um município pelo nome.
- `GET /estados/:uf/populacao`: Retorna a população de um estado.
- `GET /capitais`: Lista todas as capitais.
- `GET /municipios/populacao?acima=<numero>`: Lista municípios com população acima de um número.
- `GET /municipios/populacao?min=<numero>&max=<numero>`: Lista municípios com população entre um mínimo e um máximo.
- `GET /estados/capital-nao-mais-populosa`: Lista estados onde a capital não é a cidade mais populosa.
- `GET /municipios/mais-populosos-nao-capitais`: Lista os 10 municípios mais populosos que não são capitais.
