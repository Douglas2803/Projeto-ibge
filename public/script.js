document.addEventListener("DOMContentLoaded", () => {
  const forms = {
    "form-municipios": "/api/municipios",
    "form-populacao-estado": "/api/estados/:uf/populacao",
    "form-capitais": "/api/capitais",
    "form-municipios-populacao": "/api/municipios/populacao",
    "form-capital-nao-mais-populosa": "/api/estados/capital-nao-mais-populosa",
    "form-dez-mais-populosos": "/api/municipios/mais-populosos-nao-capitais",
  };

  const resultsContainer = document.getElementById("json-result");

  for (const [formId, endpoint] of Object.entries(forms)) {
    const form = document.getElementById(formId);
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let url = endpoint;

      if (formId === "form-municipios") {
        const nome = document.getElementById("nome-municipio").value;
        url = `${endpoint}?nome=${nome}`;
      } else if (formId === "form-populacao-estado") {
        const uf = document.getElementById("uf").value;
        if (uf) url = `/api/estados/${uf}/populacao`;
      } else if (formId === "form-municipios-populacao") {
        const filterType = document.querySelector('input[name="populacao-filter"]:checked').value;
        if (filterType === "acima") {
          const acima = document.getElementById("populacao-acima").value;
          if (acima) url = `${endpoint}?acima=${acima}`;
        } else if (filterType === "entre") {
          const min = document.getElementById("populacao-min").value;
          const max = document.getElementById("populacao-max").value;
          if (min && max) url = `${endpoint}?min=${min}&max=${max}`;
        }
      }


      try {
        const response = await fetch(url);
        const data = await response.json();
        if (formId === "form-municipios-populacao" && data.municipios && data.quantidade !== undefined) {
          let display = `Quantidade de municípios encontrados: ${data.quantidade}

`;
          data.municipios.forEach(m => {
            display += `Nome: ${m.nome_municipio}, Estado: ${m.estado}, População: ${m.populacao}
`;
          });
          resultsContainer.textContent = display;
        } else {
          resultsContainer.textContent = JSON.stringify(data, null, 2);
        }
      } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
      }
    });
  }
});
