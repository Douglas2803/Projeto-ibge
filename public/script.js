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
        url = url.replace(":uf", uf);
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        resultsContainer.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        resultsContainer.textContent = `Error: ${error.message}`;
      }
    });
  }
});
