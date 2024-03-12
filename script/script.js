document.addEventListener("DOMContentLoaded", function() {
  const resultado = document.getElementById("resultado");
  const nomesanteriores = document.getElementById("nomesanteriores");
  const sortearBtn = document.getElementById("sortear");
  const resetarBtn = document.getElementById("resetar");
  const nomes = [];
  let sorteados = [];

  sortearBtn.addEventListener("click", () => {
      if (sorteados.length === nomes.length) {
          mostrarPopup("Atenção!", "Todos os nomes já foram sorteados!", "warning");
          return;
      }

      let nomeSorteado = sortearNome();
      while (sorteados.includes(nomeSorteado)) {
          nomeSorteado = sortearNome();
      }

      sorteados.push(nomeSorteado);
      resultado.textContent = nomeSorteado;
      adicionarNomeAnterior(nomeSorteado);

      if (sorteados.length === nomes.length) {
          mostrarPopup("Sorteio Concluído!", "Todos os nomes foram sorteados!", "success");
      }
  });

  resetarBtn.addEventListener("click", () => {
      mostrarPopupConfirmacao("Confirmação", "Deseja realmente recomeçar?").then((result) => {
          if (result.isConfirmed) {
              sorteados = [];
              resultado.textContent = "";
              nomesanteriores.innerHTML = "";
          }
      });
  });

  function sortearNome() {
      const indice = Math.floor(Math.random() * nomes.length);
      return nomes[indice];
  }

  function adicionarNomeAnterior(nome) {
      const nomeAnterior = document.createElement("span");
      nomeAnterior.textContent = nome;
      nomeAnterior.style.marginRight = "100px";
      nomesanteriores.appendChild(nomeAnterior);

      if (nomesanteriores.scrollWidth > nomesanteriores.clientWidth) {
          nomesanteriores.appendChild(document.createElement("br"));
      }
  }

  function mostrarPopup(title, text, icon) {
      Swal.fire({
          title: title,
          text: text,
          icon: icon,
          position: "center",
      });
  }

  function mostrarPopupConfirmacao(title, text) {
      return Swal.fire({
          title: title,
          text: text,
          icon: "question",
          position: "center",
          showCancelButton: true,
          confirmButtonText: "Sim",
          cancelButtonText: "Não",
      });
  }

  fetch("nomes.txt")
      .then(response => response.text())
      .then(text => {
          nomes.push(...text.split("\n"));
      });
});
