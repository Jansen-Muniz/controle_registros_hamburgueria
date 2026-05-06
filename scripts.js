function enviarRegistro() {
  const pix = document.getElementById("pix").value.trim();
  const especie = document.getElementById("especie").value.trim();
  const cartao = document.getElementById("cartao").value.trim();
  const data = document.getElementById("data").value.trim();

  const dados = {
    pix: pix,
    especie: especie,
    cartao: cartao,
    data: data
  };

  fetch("https://script.google.com/macros/s/AKfycbzZB1Xqp-I5HOGkD5LOVQcKD2kdsEuSDQ-4l0p0IzDxqR-_yzRdJcDOgX8y7-gbcW8cDg/exec", {
    method: "POST",
    body: JSON.stringify(dados)
  })
    .then(data => {
      console.log("Resposta:", data);
      const mensagem = document.getElementById("mensagem");
      mensagem.style.opacity = "1";   // garante que apareça
      mensagem.style.display = "block";

      // Faz a mensagem sumir suavemente após 3 segundos
      setTimeout(() => {
        mensagem.style.transition = "opacity 1s ease"; // define transição
        mensagem.style.opacity = "0";                  // inicia fade-out
        setTimeout(() => {
          mensagem.style.display = "none";             // esconde de vez
        }, 1000); // espera o fade-out terminar
      }, 3000);

      // Limpa os campos
      document.getElementById("pix").value = "";
      document.getElementById("especie").value = "";
      document.getElementById("cartao").value = "";
      document.getElementById("data").value = "";
    })
    .catch(error => console.error("Erro:", error));
}

// Função para formatar moeda brasileira
function formatarMoeda(valor) {
  valor = valor.replace(/\D/g, ""); // remove tudo que não for número
  valor = (valor / 100).toFixed(2) + ""; // divide por 100 e fixa 2 casas
  valor = valor.replace(".", ","); // troca ponto por vírgula
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // adiciona pontos
  return "R$ " + valor;
}

// Aplica formatação enquanto digita
["pix", "especie", "cartao"].forEach(id => {
  const campo = document.getElementById(id);
  campo.addEventListener("input", function () {
    this.value = formatarMoeda(this.value);
  });
});

