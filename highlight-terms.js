/**
 * highlight-terms.js
 * 
 * Destaca múltiplos textos na página (mesmo contendo caracteres especiais)
 * e exibe o total de ocorrências encontradas.
 * 
 * Funciona com termos longos, acentos, parênteses, sinais e outros caracteres especiais.
 * 
 * Pode ser executado várias vezes na mesma página sem gerar erros.
 * 
 * @author Johnny
 * @version 1.3
 */

(() => {
  // Lista de termos a destacar
  let termos = [
    
    "Preventiva de bombas centrífugas horizontais monobloco (conjunto 1) - Bomba de água de reuso", 
    "Preventiva de bombas centrífugas horizontais monobloco (conjunto 1) - Bomba de efluente",
    
  ];

  termos.sort((a, b) => b.length - a.length);

  function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const regex = new RegExp(termos.map(escaparRegex).join("|"), "gi");

  let totalOcorrencias = 0;

  document.querySelectorAll("mark").forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
  });

  function destacar(node) {
    if (node.nodeType === 3) {
      const texto = node.textContent;
      const fragmento = document.createDocumentFragment();
      let ultimoIndex = 0;
      let match;

      while ((match = regex.exec(texto)) !== null) {
        const antes = texto.slice(ultimoIndex, match.index);
        const marcado = document.createElement("mark");
        marcado.textContent = match[0];
        Object.assign(marcado.style, {
          backgroundColor: "#fff176",
          color: "black",
          padding: "0 2px",
          borderRadius: "2px"
        });
        fragmento.appendChild(document.createTextNode(antes));
        fragmento.appendChild(marcado);
        ultimoIndex = regex.lastIndex;
        totalOcorrencias++;
      }
      fragmento.appendChild(document.createTextNode(texto.slice(ultimoIndex)));
      node.parentNode.replaceChild(fragmento, node);
    } else if (node.nodeType === 1 && !["SCRIPT","STYLE","NOSCRIPT"].includes(node.nodeName)) {
      [...node.childNodes].forEach(destacar);
    }
  }

  const inicio = performance.now();
  destacar(document.body);
  const tempo = (performance.now() - inicio).toFixed(1);

  console.log(`✅ Destaque concluído para ${termos.length} termo(s).`);
  console.log(`🔸 Ocorrências encontradas: ${totalOcorrencias}`);
  console.log(`⏱️ Tempo de execução: ${tempo} ms`);

  const msg = document.createElement("div");
  msg.textContent = `🔍 ${totalOcorrencias} ocorrência(s) destacada(s) em ${tempo} ms`;
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
