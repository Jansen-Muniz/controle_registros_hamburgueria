function enviarRegistro() {
  const pix = document.getElementById("pix").value.trim();
  const especie = document.getElementById("especie").value.trim();
  const cartao = document.getElementById("cartao").value.trim();
  const data = document.getElementById("data").value.trim();

  // 🔥 Função para limpar moeda (REMOVE R$, pontos e ajusta vírgula)
  function limparMoeda(valor) {
    return valor
      .replace("R$", "")
      .replace(/\./g, "")   // remove pontos de milhar
      .replace(",", ".")    // troca vírgula por ponto
      .trim();
  }

  const dados = {
    pix: limparMoeda(pix),
    especie: limparMoeda(especie),
    cartao: limparMoeda(cartao),
    data: data
  };

  fetch("https://script.google.com/macros/s/AKfycbzZB1Xqp-I5HOGkD5LOVQcKD2kdsEuSDQ-4l0p0IzDxqR-_yzRdJcDOgX8y7-gbcW8cDg/exec", {
    method: "POST",
    body: JSON.stringify(dados)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta:", data);

      const mensagem = document.getElementById("mensagem");
      mensagem.style.opacity = "1";
      mensagem.style.display = "block";

      // Fade-out após 3s
      setTimeout(() => {
        mensagem.style.transition = "opacity 1s ease";
        mensagem.style.opacity = "0";
        setTimeout(() => {
          mensagem.style.display = "none";
        }, 1000);
      }, 3000);

      // Limpa os campos
      document.getElementById("pix").value = "";
      document.getElementById("especie").value = "";
      document.getElementById("cartao").value = "";
      document.getElementById("data").value = "";
    })
    .catch(error => console.error("Erro:", error));
}


// 💰 Formatação visual (continua igual)
function formatarMoeda(valor) {
  valor = valor.replace(/\D/g, "");
  valor = (valor / 100).toFixed(2) + "";
  valor = valor.replace(".", ",");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "R$ " + valor;
}

// Aplica formatação enquanto digita
["pix", "especie", "cartao"].forEach(id => {
  const campo = document.getElementById(id);
  campo.addEventListener("input", function () {
    this.value = formatarMoeda(this.value);
  });
});