
const resultadoDiv = document.getElementById('resultado');

async function buscarMunicipio() {
  const nome = document.getElementById('nome-municipio').value;
  const response = await fetch(`/api/municipios?nome=${nome}`);
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}

async function buscarPopulacaoPorEstado() {
  const uf = document.getElementById('uf-estado').value;
  const response = await fetch(`/api/estados/${uf}/populacao`);
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}

async function listarCapitais() {
  const response = await fetch('/api/capitais');
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}

async function listarPorPopulacaoAcima() {
  const populacao = document.getElementById('populacao-acima').value;
  const response = await fetch(`/api/municipios/populacao?acima=${populacao}`);
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}

async function listarPorPopulacaoEntre() {
  const min = document.getElementById('populacao-min').value;
  const max = document.getElementById('populacao-max').value;
  const response = await fetch(`/api/municipios/populacao?min=${min}&max=${max}`);
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}

async function listarEstadosCapitalNaoMaisPopulosa() {
  const response = await fetch('/api/estados/capital-nao-mais-populosa');
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}

async function listarDezMaisPopulosasNaoCapitais() {
  const response = await fetch('/api/municipios/mais-populosos-nao-capitais');
  const data = await response.json();
  resultadoDiv.textContent = JSON.stringify(data, null, 2);
}
