/**
 * highlight-terms.js
 * 
 * Destaque de múltiplos termos informados no FINAL do script,
 * um por linha, sem precisar usar aspas ou vírgulas.
 * 
 * @author Johnny
 * @version 2.0
 */

(() => {

  // ================================
  // COLE OS TERMOS AQUI NO FINAL
  // UM POR LINHA
  // ================================
  const listaTermos = `
  
Preventiva de bombas centrífugas horizontais monobloco (conjunto 1) - Bomba de água de reuso
Preventiva de bombas centrífugas horizontais monobloco (conjunto 1) - Bomba de efluente

`;

  // Converte linhas em array
  let termos = listaTermos
    .split("\n")
    .map(t => t.trim())
    .filter(Boolean);

  // Ordena do maior para o menor
  termos.sort((a, b) => b.length - a.length);

  function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const regex = new RegExp(
    termos.map(escaparRegex).join("|"),
    "gi"
  );

  let totalOcorrencias = 0;

  // Remove marcações antigas
  document.querySelectorAll("mark").forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(
      document.createTextNode(mark.textContent),
      mark
    );
  });

  function destacar(node) {

    if (node.nodeType === 3) {

      const texto = node.textContent;

      // Evita erro de regex global
      regex.lastIndex = 0;

      const fragmento = document.createDocumentFragment();

      let ultimoIndex = 0;
      let match;

      while ((match = regex.exec(texto)) !== null) {

        const antes = texto.slice(
          ultimoIndex,
          match.index
        );

        fragmento.appendChild(
          document.createTextNode(antes)
        );

        const marcado = document.createElement("mark");

        marcado.textContent = match[0];

        Object.assign(marcado.style, {
          backgroundColor: "#fff176",
          color: "#000",
          padding: "0 2px",
          borderRadius: "2px"
        });

        fragmento.appendChild(marcado);

        ultimoIndex = regex.lastIndex;

        totalOcorrencias++;
      }

      fragmento.appendChild(
        document.createTextNode(
          texto.slice(ultimoIndex)
        )
      );

      node.parentNode.replaceChild(
        fragmento,
        node
      );

    } else if (
      node.nodeType === 1 &&
      !["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.nodeName)
    ) {

      [...node.childNodes].forEach(destacar);
    }
  }

  const inicio = performance.now();

  destacar(document.body);

  const tempo = (
    performance.now() - inicio
  ).toFixed(1);

  console.log(`✅ Destaque concluído`);
  console.log(`🔸 Termos pesquisados: ${termos.length}`);
  console.log(`🔍 Ocorrências encontradas: ${totalOcorrencias}`);
  console.log(`⏱️ Tempo: ${tempo} ms`);

  // Mensagem visual
  const msg = document.createElement("div");

  msg.textContent =
    `🔍 ${totalOcorrencias} ocorrência(s) destacada(s)`;

  Object.assign(msg.style, {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    background: "#000000cc",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    zIndex: 999999
  });

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 5000);

})();
